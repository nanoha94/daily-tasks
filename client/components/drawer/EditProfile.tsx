"use client";
import styles from "@/styles/form.module.css";
import PrimaryButton from "../button/PrimaryButton";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthProvider";
import FormItem from "../FormItem";
import { useEffect, useState } from "react";
import { useDrawer } from "@/contexts/DrawerProvider";

interface FormValues {
  name: string;
  bio?: string;
  profileSrc?: string;
}

const EditProfile = () => {
  const { authUser } = useAuth();
  const { setIsEditing } = useDrawer();
  const defaultValues = {
    name: authUser.name,
    bio: "",
    profileSrc: "",
  };

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
    console.log(name, bio, profileSrc);
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
            required: "your_account",
          })}
          className={`${styles.item} ${styles.item_frame}`}
        />
      </FormItem>
      <FormItem label="自己紹介" memo="250文字以内で入力してください。">
        <textarea
          rows={4}
          placeholder="あなたはどんな人？"
          {...register("name")}
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
