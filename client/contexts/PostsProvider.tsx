"use client";
import apiClient from "@/lib/apiClient";
import { Post } from "@/types/post";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

interface PostsContextType {
  posts: Post[];
  editingPost: Post | undefined;
  isOpenEdit: boolean;
  setIsOpenEdit: (state: boolean) => void;
  handleEditPostDrawer: (state: boolean, post?: Post) => void;
  createPost: (post: Omit<Post, "id" | "createdAt">) => void;
  updatePost: (post: Omit<Post, "createdAt">) => void;
}

const PostsContext = createContext<PostsContextType>({
  posts: [],
  editingPost: undefined,
  isOpenEdit: false,
  setIsOpenEdit: () => {},
  handleEditPostDrawer: () => {},
  createPost: async () => {},
  updatePost: () => {},
});

export const usePosts = () => {
  return useContext(PostsContext);
};

interface Props {
  children: React.ReactNode;
}

export const PostsProvider = ({ children }: Props) => {
  const { authUser } = useAuth();
  const [posts, setPosts] = useState<PostsContextType["posts"]>([]);
  const [editingPost, setEditingPost] =
    useState<PostsContextType["editingPost"]>(undefined);
  const [isOpenEdit, setIsOpenEdit] =
    useState<PostsContextType["isOpenEdit"]>(false);

  const handleEditPostDrawer = (state: boolean, post?: Post) => {
    setIsOpenEdit(state);
    if (!!post) {
      setEditingPost(post);
    } else {
      setEditingPost(undefined);
    }

    if (!state) {
      setEditingPost(undefined);
    }
  };

  useEffect(() => {
    console.log(editingPost);
  }, [editingPost]);

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
      setPosts((prev) => [createdPost.data, ...prev]);
    } catch (err) {
      console.log(err);
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
      setPosts((prev) =>
        prev.map((post) =>
          post.id === updatedPost.data.id ? updatedPost.data : post
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        editingPost,
        isOpenEdit,
        setIsOpenEdit,
        handleEditPostDrawer,
        createPost,
        updatePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
