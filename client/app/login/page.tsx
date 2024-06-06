import "@/styles/auth.css";
import TextInput from "../../components/form/TextInput";
import Link from "next/link";

const PageLogin = () => {
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
          <button type="submit" className="send-button">
            ログイン
          </button>
        </form>
        <p className="text-black text-base text-center">
          アカウント登録がまだの方は
          <Link href="/register">こちら</Link>
        </p>
      </div>
    </div>
  );
};

export default PageLogin;
