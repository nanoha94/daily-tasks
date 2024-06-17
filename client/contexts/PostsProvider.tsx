"use client";
import { POST_CATEGORY } from "@/costants/posts";
import apiClient from "@/lib/apiClient";
import { Post } from "@/types/post";
import { createContext, useContext, useEffect, useState } from "react";

interface PostsContextType {
  posts: Post[];
  editingPost: Post | undefined;
  editMode: number;
  isOpenEdit: boolean;
  handleEditPostDrawer: (state: boolean, mode?: number, post?: Post) => void;
  isOpenDelete: boolean;
  handleDeletePostDialog: (state: boolean, post?: Post) => void;
  createPost: (post: Omit<Post, "id" | "createdAt">) => void;
  updatePost: (post: Omit<Post, "createdAt">) => void;
  deletePost: (postId: string) => void;
}

const PostsContext = createContext<PostsContextType>({
  posts: [],
  editingPost: undefined,
  editMode: POST_CATEGORY.TASK,
  isOpenEdit: false,
  handleEditPostDrawer: () => {},
  isOpenDelete: false,
  handleDeletePostDialog: () => {},
  createPost: async () => {},
  updatePost: () => {},
  deletePost: () => {},
});

export const usePosts = () => {
  return useContext(PostsContext);
};

interface Props {
  children: React.ReactNode;
}

export const PostsProvider = ({ children }: Props) => {
  const [posts, setPosts] = useState<PostsContextType["posts"]>([]);
  const [editingPost, setEditingPost] =
    useState<PostsContextType["editingPost"]>(undefined);
  const [editMode, setEditMode] = useState<PostsContextType["editMode"]>(
    POST_CATEGORY.TASK
  );
  const [isOpenEdit, setIsOpenEdit] =
    useState<PostsContextType["isOpenEdit"]>(false);
  const [isOpenDelete, setIsOpenDelete] =
    useState<PostsContextType["isOpenDelete"]>(false);

  const handleEditPostDrawer = (state: boolean, mode?: number, post?: Post) => {
    setIsOpenEdit(state);
    setEditMode(mode ?? POST_CATEGORY.TASK);
    if (!!post) {
      if (mode === POST_CATEGORY.REVIEW) {
        setEditingPost({ ...post, comment: "" });
      } else {
        setEditingPost(post);
      }
    } else {
      setEditingPost(undefined);
    }

    if (!state) {
      setEditingPost(undefined);
    }
  };

  const handleDeletePostDialog = (state: boolean, post?: Post) => {
    setIsOpenDelete(state);
    if (!!post) {
      setEditingPost(post);
    } else {
      setEditingPost(undefined);
    }

    if (!state) {
      setEditingPost(post);
    }
  };

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

  const deletePost = async (postId: string) => {
    try {
      await apiClient.delete(`/posts/${postId}`);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        editingPost,
        editMode,
        isOpenEdit,
        handleEditPostDrawer,
        isOpenDelete,
        handleDeletePostDialog,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
