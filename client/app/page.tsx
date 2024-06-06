"use client";
import { supabase } from "@/utils/supabase";

const Page = () => {
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
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
