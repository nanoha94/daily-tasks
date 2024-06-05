import "@/styles/auth.css";
import TextInput from "../../components/form/TextInput";
import SendButton from "../../components/form/SendButton";
import Link from "next/link";

const PageRegiter = () => {
  return (
    <div>
      <h1 className="title">ログイン</h1>
      <div className="content">
        <form className="form">
          <div className="input-area">
            <TextInput
              id="email"
              label="メールアドレス"
              placeholder="you@example.com"
            />
            <TextInput
              id="password"
              label="パスワード"
              placeholder="半角英数6文字以上"
            />
          </div>
          <SendButton>ログイン</SendButton>
        </form>
        <p className="text-black text-base text-center">
          アカウント登録がまだの方は
          <Link href="/login">こちら</Link>
        </p>
      </div>
    </div>
  );
};

export default PageRegiter;
