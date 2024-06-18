"use client";
import styles from "@/styles/form.module.css";
import PrimaryButton from "../button/PrimaryButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/contexts/UserProvider";
import FormItem from "../FormItem";
import { useEffect, useState } from "react";
import { useDrawer } from "@/contexts/DrawerProvider";

interface FormValues {
  name: string;
  bio?: string;
  profileSrc?: string;
}

const EditProfile = () => {
  const { authUser, updateUser } = useUser();
  const { handleCloseDrawer, setIsEditing } = useDrawer();
  const [defaultValues, setDefaultValues] = useState<FormValues>({
    name: authUser.name,
    bio: authUser.profile?.bio,
    profileSrc: authUser.profile?.profileSrc,
  });

  const {
    register,
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });

  const watchName = watch("name");
  const watchBio = watch("bio");
  const watchProfileSrc = watch("profileSrc");
  const [isEnable, setIsEnable] = useState<boolean>(false);

  const handleSubmitSuccess: SubmitHandler<FormValues> = async ({
    name,
    bio,
    profileSrc,
  }: FormValues) => {
    await updateUser({
      ...authUser,
      name,
      profile: { id: authUser.profile?.id ?? undefined, bio, profileSrc },
    });
    handleCloseDrawer();
  };

  useEffect(() => {
    // 条件を満たすとボタンがクリックできるようになる
    // 【条件】変更がある場合、かつ、タスクが１つ以上存在する場合
    setIsEnable(
      (defaultValues.name !== watchName ||
        defaultValues.bio !== watchBio ||
        defaultValues.profileSrc !== watchProfileSrc) &&
        watchName !== ""
    );

    setIsEditing(
      defaultValues.name !== watchName ||
        defaultValues.bio !== watchBio ||
        defaultValues.profileSrc !== watchProfileSrc
    );
  }, [watchName, watchBio, watchProfileSrc]);

  // useEffect(() => {
  //   console.log(authUser);
  //   reset({
  //     name: authUser.name,
  //     bio: authUser.profile?.bio,
  //     profileSrc: authUser.profile?.profileSrc,
  //   });
  // }, []);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSuccess)}
      className="flex flex-col gap-y-5"
    >
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
          })}
          className={`${styles.item} ${styles.item_frame}`}
        />
      </FormItem>
      <FormItem label="自己紹介" memo="250文字以内で入力してください。">
        <textarea
          rows={4}
          placeholder="あなたはどんな人？"
          {...register("bio")}
          className={`${styles.item} ${styles.item_frame}`}
        />
      </FormItem>
      <div className="ml-auto mr-0">
        <PrimaryButton type="submit" disabled={!isEnable}>
          保存する
        </PrimaryButton>
      </div>
    </form>
  );
};

export default EditProfile;
