"use client";
import { Post } from "@/types/post";
import React, { createContext, useContext, useEffect, useState } from "react";

interface DialogContextType {
  dialog: React.ReactNode;
  isOpenDialog: boolean;
  handleOpenDialog: ({ dialog, post }: OpenProps) => void;
  handleCloseDialog: () => void;
}

const DialogContext = createContext<DialogContextType>({
  dialog: <></>,
  isOpenDialog: false,
  handleOpenDialog: () => {},
  handleCloseDialog: () => {},
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

  const handleOpenDialog = ({ dialog, post }: OpenProps) => {
    setIsOpenDialog(true);
    setDialog(dialog);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  return (
    <DialogContext.Provider
      value={{
        dialog,
        isOpenDialog,
        handleOpenDialog,
        handleCloseDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
