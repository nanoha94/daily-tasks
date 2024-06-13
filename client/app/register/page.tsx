"use client";
import styles from "@/styles/auth.module.css";
import TextInput from "../../components/form/TextInput";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthProvider";

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const PageRegister = () => {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleSubmitSuccess: SubmitHandler<FormValues> = async ({
    name,
    email,
    password,
    passwordConfirm,
  }: FormValues) => {
    if (password !== passwordConfirm) {
      throw new Error("パスワードが一致しません");
    }
    try {
      await signUp(email, password, name);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>アカウント登録</h1>
      <div className={styles.content}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(handleSubmitSuccess)}
        >
          <div className={styles.input_area}>
            <TextInput
              id="name"
              label="アカウント名"
              placeholder="your_account"
              errorMessage={errors.name?.message}
              {...register("name", {
                required: "必須項目です",
              })}
            />
            <TextInput
              id="email"
              type="email"
              label="メールアドレス"
              placeholder="you@example.com"
              errorMessage={errors.email?.message}
              {...register("email", {
                required: "必須項目です",
                // TODO: バリデーション追加（メールアドレスの形式か）
              })}
            />
            <TextInput
              id="password"
              type="password"
              label="パスワード"
              placeholder="半角英数6文字以上"
              errorMessage={errors.password?.message}
              {...register("password", {
                required: "必須項目です",
                // TODO: バリデーション追加（パスワードの入力条件に合っているか）
              })}
            />
            <TextInput
              id="password"
              type="password"
              label="パスワード（確認用）"
              placeholder="半角英数6文字以上"
              errorMessage={errors.passwordConfirm?.message}
              {...register("passwordConfirm", {
                required: "必須項目です",
                // TODO: バリデーション追加（パスワードの入力条件に合っているか）
              })}
            />
          </div>
          <button type="submit" className={styles.submit_button}>
            アカウント作成
          </button>
        </form>
        <p className="text-black text-base text-center">
          ログインは
          <Link href="/login" className={styles.link}>
            こちら
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PageRegister;
