"use client";
import styles from "@/styles/auth.module.css";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthProvider";
import FormItem from "@/components/FormItem";

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const PageRegister = () => {
  const { signUp } = useAuth();
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });

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
      reset(defaultValues);
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
            <FormItem
              id="name"
              label="アカウント名"
              errorMessage={errors.name?.message}
            >
              <input
                id="name"
                placeholder="your_account"
                type="text"
                {...register("name", {
                  required: "必須項目です",
                })}
                className={`${styles.item} ${
                  !!errors.name && styles.item_error
                }`}
              />
            </FormItem>
            <FormItem
              id="email"
              label="メールアドレス"
              errorMessage={errors.name?.message}
            >
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "必須項目です",
                  // TODO: バリデーション追加（メールアドレスの形式か）
                })}
                className={`${styles.item} ${
                  !!errors.email && styles.item_error
                }`}
              />
            </FormItem>
            <FormItem
              id="password"
              label="パスワード"
              errorMessage={errors.password?.message}
            >
              <input
                id="password"
                type="password"
                placeholder="半角英数6文字以上"
                {...register("password", {
                  required: "必須項目です",
                  // TODO: バリデーション追加（パスワードの入力条件に合っているか）
                })}
                className={`${styles.item} ${
                  !!errors.password && styles.item_error
                }`}
              />
            </FormItem>
            <FormItem
              id="passwordConfirm"
              label="パスワード（確認用）"
              errorMessage={errors.passwordConfirm?.message}
            >
              <input
                id="passwordConfirm"
                type="password"
                placeholder="半角英数6文字以上"
                {...register("passwordConfirm", {
                  required: "必須項目です",
                  // TODO: バリデーション追加（パスワードの入力条件に合っているか）
                })}
                className={`${styles.item} ${
                  !!errors.passwordConfirm && styles.item_error
                }`}
              />
            </FormItem>
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
