"use client";
import { useAuth } from "@/contexts/AuthProvider";

const Page = () => {
  const { signOut } = useAuth();

  const logout = () => {
    try {
      signOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // TODO: 後で削除（開発用に設置）
    <button onClick={logout}>ログアウト</button>
  );
};

export default Page;
