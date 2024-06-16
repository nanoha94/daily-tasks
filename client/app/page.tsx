"use client";
import Header from "@/components/Header";
import PostItem from "@/components/PostItem";
import CreatePost from "@/components/drawer/CreatePost";
import CreatePostDrawer from "@/components/drawer/CreatePostDrawer";
import { useAuth } from "@/contexts/AuthProvider";
import { usePosts } from "@/contexts/PostsProvider";
import apiClient from "@/lib/apiClient";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";

const Page = () => {
  const { user, signOut } = useAuth();
  const { posts } = usePosts();

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const posts = await apiClient.get("/posts");
  //       if (!!posts) {
  //         setLatestPosts(posts.data);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchPosts();
  // }, []);

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
          <ul className="flex flex-col gap-y-2 mx-auto md:w-3/5">
            {!!posts &&
              posts.map((post) => (
                <li key={post.id}>
                  <PostItem post={post} />
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="md:hidden">
        <CreatePostDrawer />
      </div>
    </>
  );
};

export default Page;
