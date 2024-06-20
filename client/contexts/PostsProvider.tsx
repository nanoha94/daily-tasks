"use client";
import { POST_CATEGORY } from "@/costants/posts";
import apiClient from "@/lib/apiClient";
import { Post } from "@/types/post";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserProvider";

interface PostsContextType {
  allPosts: Post[];
  editingPost: Post | undefined;
  editMode: number;
  isOpenDelete: boolean;
  createPost: (post: Omit<Post, "id" | "createdAt">) => Promise<void>;
  updatePost: (post: Omit<Post, "createdAt">) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

const PostsContext = createContext<PostsContextType>({
  allPosts: [],
  editingPost: undefined,
  editMode: POST_CATEGORY.TASK,
  isOpenDelete: false,
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
  const { authUser } = useUser();
  const [allPosts, setAllPosts] = useState<PostsContextType["allPosts"]>([]);
  const [editingPost, setEditingPost] =
    useState<PostsContextType["editingPost"]>(undefined);
  const [editMode, setEditMode] = useState<PostsContextType["editMode"]>(
    POST_CATEGORY.TASK
  );
  const [isOpenDelete, setIsOpenDelete] =
    useState<PostsContextType["isOpenDelete"]>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await apiClient.get("/posts");
        if (!!posts) {
          setAllPosts(posts.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setAllPosts((prev) =>
      prev.map((post) =>
        post.author.id === authUser.id ? { ...post, author: authUser } : post
      )
    );
  }, [authUser]);

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
        allPosts,
        editingPost,
        editMode,
        isOpenDelete,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
