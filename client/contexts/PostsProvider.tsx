"use client";
import apiClient from "@/lib/apiClient";
import { Post } from "@/types/post";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserProvider";

interface PostsContextType {
  processingFetchAllPosts: boolean;
  allPosts: Post[];
  createPost: (post: Omit<Post, "id" | "createdAt">) => Promise<void>;
  updatePost: (post: Omit<Post, "createdAt">) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

const PostsContext = createContext<PostsContextType>({
  processingFetchAllPosts: false,
  allPosts: [],
  createPost: async () => {},
  updatePost: async () => {},
  deletePost: async () => {},
});

export const usePosts = () => {
  return useContext(PostsContext);
};

interface Props {
  children: React.ReactNode;
}

export const PostsProvider = ({ children }: Props) => {
  const [processingFetchAllPosts, setProcessingFetchAllPosts] = useState(false);
  const { authUser } = useUser();
  const [allPosts, setAllPosts] = useState<PostsContextType["allPosts"]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setProcessingFetchAllPosts(true);
      try {
        const posts = await apiClient.get("/posts");
        if (!!posts) {
          setAllPosts(posts.data);
        }
      } catch (err) {
        console.error(err);
      }
      setProcessingFetchAllPosts(false);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setAllPosts((prev) =>
      prev.map((post) =>
        post.author.id === authUser.id ? { ...post, author: authUser } : post
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser.id]);

  const createPost = async (post: Omit<Post, "id" | "createdAt">) => {
    const { comment, tasks, category, numOfGood, author } = post;
    try {
      const createdPost = await apiClient.post("/posts", {
        comment,
        tasks,
        category,
        numOfGood,
        authorId: author.id,
      });
      setAllPosts((prev) => [createdPost.data.post, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const updatePost = async (post: Omit<Post, "createdAt">) => {
    const { id, comment, tasks, category, numOfGood, author } = post;
    try {
      const updatedPost = await apiClient.put(`/posts/${id}`, {
        comment,
        tasks,
        category,
        numOfGood,
        authorId: author?.id,
      });
      setAllPosts((prev) =>
        prev.map((post) =>
          post.id === updatedPost.data.post.id ? updatedPost.data.post : post
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await apiClient.delete(`/posts/${postId}`);
      setAllPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        processingFetchAllPosts,
        allPosts,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
