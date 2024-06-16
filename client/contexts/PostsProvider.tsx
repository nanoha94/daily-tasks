"use client";
import apiClient from "@/lib/apiClient";
import { Post } from "@/types/post";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface PostsContextType {
  posts: Post[];
  addPosts: (addedPost: Post) => void;
  updatePosts: (updatedPost: Post) => void;
}

const PostsContext = createContext<PostsContextType>({
  posts: [],
  addPosts: () => {},
  updatePosts: () => {},
});

export const usePosts = () => {
  return useContext(PostsContext);
};

interface Props {
  children: React.ReactNode;
}

export const PostsProvider = ({ children }: Props) => {
  const [posts, setPosts] = useState<PostsContextType["posts"]>([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await apiClient.get("/posts");
        if (!!posts) {
          setPosts(posts.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const addPosts = (addedPost: Post) => {
    setPosts((prev) => [addedPost, ...prev]);
  };

  const updatePosts = (updatedPost: Post) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  return (
    <PostsContext.Provider value={{ posts, addPosts, updatePosts }}>
      {children}
    </PostsContext.Provider>
  );
};
