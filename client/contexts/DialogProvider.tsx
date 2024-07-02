"use client";
import { Post } from "@/types/post";
import React, { createContext, useContext, useEffect, useState } from "react";

interface DialogContextType {
  dialog: React.ReactNode;
  isOpenDialog: boolean;
  handleOpenDialog: ({ dialog, post }: OpenProps) => void;
  handleCloseDialog: () => void;
  editingPost: Post | undefined;
}

const DialogContext = createContext<DialogContextType>({
  dialog: <></>,
  isOpenDialog: false,
  handleOpenDialog: () => {},
  handleCloseDialog: () => {},
  editingPost: undefined,
});

export const useDialog = () => {
  return useContext(DialogContext);
};

interface Props {
  children: React.ReactNode;
}

interface OpenProps {
  dialog: React.ReactNode;
  post?: Post;
}

export const DialogProvider = ({ children }: Props) => {
  const [dialog, setDialog] = useState<DialogContextType["dialog"]>(<></>);
  const [isOpenDialog, setIsOpenDialog] =
    useState<DialogContextType["isOpenDialog"]>(false);
  const [editingPost, setEditingPost] =
    useState<DialogContextType["editingPost"]>(undefined);

  const handleOpenDialog = ({ dialog, post }: OpenProps) => {
    setIsOpenDialog(true);
    setDialog(dialog);
    if (!!post) {
      // FIXED: 上記の2つのメソッドもこちらのif文に入れてしまう方が良いと思います。
      // FullscreenDrawerコンポーネントから呼び出す時は、post情報不要でダイアログを表示したいので、このままで良いはずです（阿部）
      setEditingPost(post);
    }
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
    setEditingPost(undefined);
  };

  return (
    <DialogContext.Provider
      value={{
        dialog,
        isOpenDialog,
        handleOpenDialog,
        handleCloseDialog,
        editingPost,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
