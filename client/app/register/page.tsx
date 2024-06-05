"use client";
import "@/styles/auth.css";
import TextInput from "../../components/form/TextInput";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const PageRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const handleSubmitSuccess: SubmitHandler<FormValues> = (data) => {
    console.log("submit", data);
  };

  console.log(errors);

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
                required: "アカウント名を入力してください",
              })}
            />
            <TextInput
              id="email"
              label="メールアドレス"
              placeholder="you@example.com"
              errorMessage={errors.email?.message}
              {...register("email", {
                required: "メールアドレスを入力してください",
              })}
            />
            <TextInput
              id="password"
              label="パスワード"
              placeholder="半角英数6文字以上"
              errorMessage={errors.password?.message}
              {...register("password", {
                required: "パスワードを入力してください",
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
