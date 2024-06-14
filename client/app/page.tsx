"use client";
import Header from "@/components/Header";
import PostItem from "@/components/PostItem";
import CreatePost from "@/components/drawer/CreatePost";
import CreatePostDrawer from "@/components/drawer/CreatePostDrawer";
import { useAuth } from "@/contexts/AuthProvider";
import apiClient from "@/lib/apiClient";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";

const Page = () => {
  const { signOut } = useAuth();
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    }
  };

  const profile = {
    id: "profile_01",
    bio: "",
    profileScr: "",
  };

  const user = {
    id: "user_01",
    name: "user-name",
    posts: null,
    profile,
  };

  const addLatestPosts = (newPost: Post) => {
    setLatestPosts((prev) => [newPost, ...latestPosts]);
  };

  const updateLatestPosts = (updatedPost: Post) => {
    setLatestPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await apiClient.get("/posts");
        setLatestPosts(posts.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      {/* TODO: 後で削除（開発用に設置） */}
      <button onClick={logout}>ログアウト</button>
      <Header user={user} />
      <div className="flex-1 bg-bg">
        <div className="max-w-[960px] w-full py-3 mx-auto md:flex md:justify-center md:items-start md:gap-x-6 md:py-5 md:px-4">
          <div className="hidden md:block md:min-w-[300px] md:w-2/5 md:bg-white md:rounded md:shadow-sm md:py-5 md:px-4">
            <CreatePost addPost={addLatestPosts} />
          </div>
          <ul className="flex flex-col gap-y-2 mx-auto md:w-3/5">
            {!!latestPosts &&
              latestPosts.map((post) => (
                <li key={post.id}>
                  <PostItem post={post} updatePost={updateLatestPosts} />
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="md:hidden">
        <CreatePostDrawer addPost={addLatestPosts} />
      </div>
    </>
  );
};

export default Page;
