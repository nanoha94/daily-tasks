"use client";
import { SNACKBAR_TYPE } from "@/costants/snackbar";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface SnackbarContextType {
  isOpenSnackbar: boolean;
  alertType: SNACKBAR_TYPE;
  message: string;
  handleOpenSnackbar: ({ type, message }: OpenProps) => void;
  handleCloseSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  isOpenSnackbar: false,
  alertType: SNACKBAR_TYPE.INFO,
  message: "",
  handleOpenSnackbar: () => {},
  handleCloseSnackbar: () => {},
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
  const pathname = usePathname();

  useEffect(() => {
    if (alertType !== SNACKBAR_TYPE.INFO) {
      setIsOpenSnackbar(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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

  const handleCloseSnackbar = () => {
    setIsOpenSnackbar(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        isOpenSnackbar,
        alertType,
        message,
        handleOpenSnackbar,
        handleCloseSnackbar,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
