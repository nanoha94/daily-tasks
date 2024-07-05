"use client";
import styles from "@/styles/auth.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PageRegisterSuccess = () => {
  return (
    <div>
      <h1 className={styles.title}>アカウント登録完了</h1>
      <div className={styles.text_content}>
        <p className="text-black text-base text-center">
          ご登録ありがとうございます。
        </p>
        <p className="text-black text-base text-center">
          ご登録メールアドレス宛てに確認メールを送りました。
        </p>
        <p className="text-black text-base text-center">
          メールに記載してあるURLにアクセス後、アカウント登録完了となります。
        </p>
      </div>
    </div>
  );
};

export default PageRegisterSuccess;
