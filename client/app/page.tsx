"use client";
import Header from "@/components/Header";
import PostList from "@/components/PostList";
import CreatePost from "@/components/drawer/CreatePost";
import CreatePostDrawer from "@/components/drawer/CreatePostDrawer";
import { useAuth } from "@/contexts/AuthProvider";
import { usePosts } from "@/contexts/PostsProvider";

const Page = () => {
  const { user, signOut } = useAuth();

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* TODO: 後で削除（開発用に設置） */}
      <button onClick={logout}>ログアウト</button>
      <Header user={user} />
      <div className="flex-1 bg-bg">
        <div className="max-w-[960px] w-full py-3 mx-auto md:flex md:justify-center md:items-start md:gap-x-6 md:py-5 md:px-4">
          <div className="hidden md:block md:min-w-[300px] md:w-2/5 md:bg-white md:rounded md:shadow-sm md:py-5 md:px-4">
            <CreatePost />
          </div>
          <PostList />
        </div>
      </div>
      <div className="md:hidden">
        <CreatePostDrawer />
      </div>
    </>
  );
};

export default Page;
