"use client";
import { Post } from "@/types/post";
import React, { createContext, useContext, useEffect, useState } from "react";

interface DrawerContextType {
  drawer: React.ReactNode;
  isOpenDrawer: boolean;
  handleOpenDrawer: ({ drawer, post }: OpenProps) => void;
  handleCloseDrawer: () => void;
  editingPost: Post | undefined;
  isEditing: boolean;
  setIsEditing: (state: boolean) => void;
}

const DrawerContext = createContext<DrawerContextType>({
  drawer: <></>,
  isOpenDrawer: false,
  handleOpenDrawer: () => {},
  handleCloseDrawer: () => {},
  editingPost: undefined,
  isEditing: false,
  setIsEditing: () => {},
});

export const useDrawer = () => {
  return useContext(DrawerContext);
};

interface Props {
  children: React.ReactNode;
}

interface OpenProps {
  drawer: React.ReactNode;
  post?: Post;
}

export const DrawerProvider = ({ children }: Props) => {
  const [drawer, setDrawer] = useState<DrawerContextType["drawer"]>(<></>);
  const [isOpenDrawer, setIsOpenDrawer] =
    useState<DrawerContextType["isOpenDrawer"]>(false);
  const [editingPost, setEditingPost] =
    useState<DrawerContextType["editingPost"]>(undefined);
  const [isEditing, setIsEditing] =
    useState<DrawerContextType["isEditing"]>(false);

  const handleOpenDrawer = ({ drawer, post }: OpenProps) => {
    setIsOpenDrawer(true);
    setDrawer(drawer);
    if (!!post) {
      // REVIEW: 上記の2つのメソッドもこちらのif文に入れてしまう方が良いと思います。
      // REVIEW: すみません、新規作成の場合もあるので上記修正はダメですね。こちらのコメント削除して大丈夫です。
      setEditingPost(post);
    }
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setEditingPost(undefined);
  };

  return (
    <DrawerContext.Provider
      value={{
        drawer,
        isOpenDrawer,
        handleOpenDrawer,
        handleCloseDrawer,
        editingPost,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
