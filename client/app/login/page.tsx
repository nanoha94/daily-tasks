"use client";
import styles from "@/styles/auth.module.css";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/contexts/UserProvider";
import FormItem from "@/components/FormItem";

interface FormValues {
  email: string;
  password: string;
}

const PageLogin = () => {
  const { signIn } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const handleSubmitSuccess: SubmitHandler<FormValues> = async ({
    email,
    password,
  }: FormValues) => {
    signIn(email, password);

    // REVIEW: バリデーションエラー（setError）を使用して認証に失敗したことを表示させましょう。
    // ※ errors.password.message でパスワードフォームにエラーメッセージを表示させてください。
    // setError('email', {message: ''})
    // setError('password', {message: 'ログインできません。'})
  };

  return (
    <div>
      <h1 className={styles.title}>ログイン</h1>
      <div className={styles.content}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(handleSubmitSuccess)}
        >
          <div className={styles.input_area}>
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
              errorMessage={errors.email?.message}
            >
              <input
                id="password"
                type="password"
                placeholder="半角英数6文字以上"
                {...register("password", {
                  required: "必須項目です",
                })}
                className={`${styles.item} ${
                  !!errors.password && styles.item_error
                }`}
              />
            </FormItem>
          </div>
          <button type="submit" className={styles.submit_button}>
            ログイン
          </button>
        </form>
        <p className="text-black text-base text-center">
          アカウント登録がまだの方は
          <Link href="/register" className={styles.link}>
            こちら
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PageLogin;
