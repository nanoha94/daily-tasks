"use client";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthProvider";

const Page = () => {
  const { signOut } = useAuth();

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      {/* TODO: 後で削除（開発用に設置） */}
      <button onClick={logout}>ログアウト</button>
    </>
  );
};

export default Page;
