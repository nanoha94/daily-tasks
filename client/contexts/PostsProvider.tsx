"use client";
import apiClient from "@/lib/apiClient";
import { Post } from "@/types/post";
import { createContext, useContext, useEffect, useState } from "react";

interface PostsContextType {
  posts: Post[];
  editingPost: Post | undefined;
  isOpenEdit: boolean;
  setIsOpenEdit: (state: boolean) => void;
  handleEditPostDrawer: (state: boolean, post?: Post) => void;
  addPosts: (addedPost: Post) => void;
  updatePosts: (updatedPost: Post) => void;
}

const PostsContext = createContext<PostsContextType>({
  posts: [],
  editingPost: undefined,
  isOpenEdit: false,
  setIsOpenEdit: () => {},
  handleEditPostDrawer: () => {},
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

  const addPosts = (addedPost: Post) => {
    setPosts((prev) => [addedPost, ...prev]);
  };

  const updatePosts = (updatedPost: Post) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        editingPost,
        isOpenEdit,
        setIsOpenEdit,
        handleEditPostDrawer,
        addPosts,
        updatePosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
