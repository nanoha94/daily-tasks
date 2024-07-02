"use client";
import styles from "@/styles/form.module.css";
import PrimaryButton from "../button/PrimaryButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/contexts/UserProvider";
import FormItem from "../FormItem";
import { useEffect, useRef, useState } from "react";
import { useDrawer } from "@/contexts/DrawerProvider";
import { CameraIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";
import { colors } from "@/tailwind.config";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

interface FormValues {
  name: string;
  bio?: string;
  profileSrc?: string;
}

const StyledCameraIcon = styled(CameraIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 32px;
  height: auto;
  color: ${colors.white};
`;

const EditProfile = () => {
  const { authUser, updateUser, getProfileImg, uploadProfileImg } = useUser();
  const { handleCloseDrawer, setIsEditing, isOpenDrawer } = useDrawer();
  const [defaultValues, setDefaultValues] = useState<FormValues>({
    name: authUser.name,
    bio: authUser.profile?.bio,
  });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues });

  const watchName = watch("name");
  const watchBio = watch("bio");
  // REVIEW: ボタン非活性 ←このようなコメントが欲しいです。
  const [isEnable, setIsEnable] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [defaultProfileSrc, setDefaultProfileSrc] = useState<string>();
  const [profileImgFile, setProfileImgFile] = useState<File>();
  const [profileImgFileName, setProfileImgFileName] = useState<string>("");
  const [profileSrc, setProfileSrc] = useState<string>("");

  const handleChangeProfileImg = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    if (!!files && !!files[0]) {
      const fileExtension = files[0].name.split(".").pop();
      setProfileSrc(window.URL.createObjectURL(files[0]));
      setProfileImgFile(files[0]);
      setProfileImgFileName(`${uuidv4()}.${fileExtension}`);
    }
  };

  useEffect(() => {
    return () => {
      if (profileSrc) {
        window.URL.revokeObjectURL(profileSrc);
      }
    };
  }, [profileSrc]);

  const handleSubmitSuccess: SubmitHandler<FormValues> = async ({
    name,
    bio,
  }: FormValues) => {
    if (!!profileImgFile) {
      await uploadProfileImg(profileImgFile, profileImgFileName);
    }
    await updateUser({
      ...authUser,
      name,
      profile: {
        id: authUser.profile?.id ?? undefined,
        bio,
        profileSrc: profileImgFileName,
      },
    });

    handleCloseDrawer();
  };

  useEffect(() => {
    // 条件を満たすとボタンがクリックできるようになる
    // 【条件】変更がある場合、かつ、タスクが１つ以上存在する場合
    setIsEnable(
      (defaultValues.name !== watchName ||
        defaultValues.bio !== watchBio ||
        defaultProfileSrc !== profileSrc) &&
        watchName !== ""
    );

    // REVIEW: 上の条件式と同じコードのため関数化するといいと思います。（下に関数化したものを書いてみました。）
    setIsEditing(
      defaultValues.name !== watchName ||
        defaultValues.bio !== watchBio ||
        defaultProfileSrc !== profileSrc
    );
  }, [
    defaultValues,
    defaultProfileSrc,
    setIsEditing,
    watchName,
    watchBio,
    profileSrc,
  ]);

  // const isExistChange = (): boolean => {
  //   return defaultValues.name !== watchName || 
  //   defaultValues.bio !== watchBio || 
  //   defaultProfileSrc !== profileSrc
  // }

  useEffect(() => {
    //  reset data to initial state
    reset({
      name: authUser.name,
      bio: authUser.profile?.bio,
    });
    setDefaultValues({
      name: authUser.name,
      bio: authUser.profile?.bio,
    });
    const storageImg = getProfileImg(authUser);
    setDefaultProfileSrc(storageImg);
    setProfileSrc(storageImg);
    setProfileImgFileName(authUser.profile?.profileSrc ?? "");
  }, [
    getProfileImg,
    setDefaultProfileSrc,
    setProfileSrc,
    setProfileImgFileName,
    isOpenDrawer,
    authUser,
    reset,
  ]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSuccess)}
      className="flex flex-col gap-y-5"
    >
      <div className="relative w-[80px] h-auto aspect-square mx-auto">
        {!!profileSrc && (
          <Image
            src={profileSrc}
            alt={`${authUser.name}のプロフィール画像`}
            fill={true}
            style={{ objectFit: "cover" }}
            className="rounded-full"
          />
        )}
        <button
          type="button"
          onClick={() => !!fileInputRef.current && fileInputRef.current.click()}
          className={`absolute w-full h-full rounded-full hover:opacity-50 transition-all ${
            !profileSrc ? "bg-gray-500" : "hover:bg-gray-600"
          }`}
        >
          <StyledCameraIcon />
        </button>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={handleChangeProfileImg}
        />
      </div>
      <FormItem
        label="アカウント名（必須）"
        memo="30文字以内で入力してください。"
      >
        <input
          id="name"
          placeholder="your_account"
          type="text"
          {...register("name", {
            required: "必須項目です",
            maxLength: {
              value: 30,
              message: "30文字以内で入力してください",
            },
          })}
          className={`${styles.item} ${styles.item_frame}`}
        />
        {errors.name && (
          <p className={styles.text_error}>{errors.name.message}</p>
        )}
      </FormItem>
      <FormItem label="自己紹介" memo="250文字以内で入力してください。">
        <textarea
          rows={4}
          placeholder="あなたはどんな人？"
          {...register("bio", {
            maxLength: {
              value: 250,
              message: "250文字以内で入力してください",
            },
          })}
          className={`${styles.item} ${styles.item_frame}`}
        />
        {errors.bio && (
          <p className={styles.text_error}>{errors.bio.message}</p>
        )}
      </FormItem>
      <div className="ml-auto mr-0">
        <PrimaryButton type="submit" disabled={!isEnable || isSubmitting}>
          保存する
        </PrimaryButton>
      </div>
    </form>
  );
};

export default EditProfile;
