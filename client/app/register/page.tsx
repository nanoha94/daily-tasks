"use client";
import "@/styles/auth.css";
import TextInput from "../../components/form/TextInput";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const PageRegister = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleSubmitSuccess: SubmitHandler<FormValues> = async ({
    email,
    password,
    passwordConfirm,
  }: FormValues) => {
    if (password !== passwordConfirm) {
      throw new Error("パスワードが一致しません");
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log(data, error);
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="title">アカウント登録</h1>
      <div className="content">
        <form className="form" onSubmit={handleSubmit(handleSubmitSuccess)}>
          <div className="input-area">
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
              label="パスワード（確認用）"
              placeholder="半角英数6文字以上"
              errorMessage={errors.passwordConfirm?.message}
              {...register("passwordConfirm", {
                required: "必須項目です",
                // TODO: バリデーション追加（パスワードの入力条件に合っているか）
              })}
            />
          </div>
          <button
            type="submit"
            className="send-button"
            onClick={() => {
              console.log("click");
            }}
          >
            アカウント作成
          </button>
        </form>
        <p className="text-black text-base text-center">
          ログインは
          <Link href="/login">こちら</Link>
        </p>
      </div>
    </div>
  );
};

export default PageRegister;
