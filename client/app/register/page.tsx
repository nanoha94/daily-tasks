"use client";
import styles from "@/styles/auth.module.css";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/contexts/UserProvider";
import FormItem from "@/components/FormItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { error } from "console";

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const PageRegister = () => {
  const { signUp } = useUser();
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
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });
  const router = useRouter();
  const watchPassword = watch("password");
  const wacthPasswordConfirm = watch("passwordConfirm");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>("");

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
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      if (watchPassword !== wacthPasswordConfirm) {
        setPasswordConfirmError("パスワードが一致しません");
      } else {
        setPasswordConfirmError("");
      }
    }
  }, [
    isSubmitted,
    setPasswordConfirmError,
    watchPassword,
    wacthPasswordConfirm,
  ]);

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
              errorMessage={errors.email?.message}
            >
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "必須項目です",
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
                  pattern: {
                    value: /[a-zA-Z0-9]{6,}/,
                    message: "6文字以上英数字で入力してください",
                  },
                })}
                className={`${styles.item} ${
                  !!errors.password && styles.item_error
                }`}
              />
            </FormItem>
            <FormItem
              id="passwordConfirm"
              label="パスワード（確認用）"
              errorMessage={
                errors.passwordConfirm?.message || passwordConfirmError
              }
            >
              <input
                id="passwordConfirm"
                type="password"
                placeholder="半角英数6文字以上"
                {...register("passwordConfirm", {
                  required: "必須項目です",
                  minLength: {
                    value: 6,
                    message: "6文字以上英数字で入力してください",
                  },
                })}
                className={`${styles.item} ${
                  (!!errors.passwordConfirm || !!passwordConfirmError) &&
                  styles.item_error
                }`}
              />
            </FormItem>
          </div>
          <button
            type="submit"
            className={styles.submit_button}
            onClick={() => setIsSubmitted(true)}
          >
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
