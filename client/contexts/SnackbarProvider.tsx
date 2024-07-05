"use client";
import { SNACKBAR_TYPE } from "@/costants/snackbar";
import React, { createContext, useContext, useState } from "react";

interface SnackbarContextType {
  isOpenSnackbar: boolean;
  alertType: SNACKBAR_TYPE;
  message: string;
  handleOpenSnackbar: ({ type, message }: OpenProps) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  isOpenSnackbar: false,
  alertType: SNACKBAR_TYPE.INFO,
  message: "",
  handleOpenSnackbar: () => {},
});

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

interface Props {
  children: React.ReactNode;
}

interface OpenProps {
  type: SNACKBAR_TYPE;
  message: string;
}

export const SnackbarProvider = ({ children }: Props) => {
  const [isOpenSnackbar, setIsOpenSnackbar] =
    useState<SnackbarContextType["isOpenSnackbar"]>(false);
  const [alertType, setAlertType] = useState<SnackbarContextType["alertType"]>(
    SNACKBAR_TYPE.INFO
  );
  const [message, setMessage] = useState<string>("");

  const handleOpenSnackbar = ({ type, message }: OpenProps) => {
    setAlertType(type);
    setMessage(message);
    setIsOpenSnackbar(true);

    if (type === SNACKBAR_TYPE.INFO) {
      setTimeout(() => {
        setIsOpenSnackbar(false);
      }, 5000);
    }
  };

  return (
    <SnackbarContext.Provider
      value={{
        isOpenSnackbar,
        alertType,
        message,
        handleOpenSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
