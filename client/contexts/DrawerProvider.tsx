"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface DrawerContextType {
  isEditing: boolean;
  setIsEditing: (state: boolean) => void;
}

const DrawerContext = createContext<DrawerContextType>({
  isEditing: false,
  setIsEditing: () => {},
});

export const useDrawer = () => {
  return useContext(DrawerContext);
};

interface Props {
  children: React.ReactNode;
}

export const DrawerProvider = ({ children }: Props) => {
  const [isEditing, setIsEditing] =
    useState<DrawerContextType["isEditing"]>(false);

  return (
    <DrawerContext.Provider value={{ isEditing, setIsEditing }}>
      {children}
    </DrawerContext.Provider>
  );
};
