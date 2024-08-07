"use client";
import apiClient from "@/lib/apiClient";
import { DefaultUser, User } from "@/types/user";
import { supabase } from "@/utils/supabase";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useSnackbar } from "./SnackbarProvider";
import { SNACKBAR_TYPE } from "@/costants/snackbar";
import { AuthError } from "@supabase/supabase-js";

interface UserContextType {
  authUser: User;
  getUserByDatabase: (id: User["id"]) => Promise<User | undefined>;
  updateUser: (user: User) => Promise<void>;
  getProfileImg: (user: User) => string;
  uploadProfileImg: (file: File, fileName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<void | AuthError | Error | unknown>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  authUser: DefaultUser,
  getUserByDatabase: async () => undefined,
  updateUser: async () => {},
  getProfileImg: () => "",
  uploadProfileImg: async () => {},
  signIn: async () => {},
  signUp: async () => true,
  signOut: async () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [isInit, setIsInit] = useState<boolean>(true);
  const [authUser, setUser] =
    useState<UserContextType["authUser"]>(DefaultUser);
  const pathname = usePathname();
  const router = useRouter();
  const { handleOpenSnackbar, handleCloseSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchAuthUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!!data.user) {
        const user = await getUserByDatabase(data.user.id);
        if (!!user) {
          setUser(user);
        } else {
          setUser(DefaultUser);
        }
      } else {
        setUser(DefaultUser);
      }
      setIsInit(false);
    };
    fetchAuthUser();

    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!!session?.user) {
        const user = await getUserByDatabase(session.user.id);
        if (!!user) {
          setUser(user);
        } else {
          setUser(DefaultUser);
        }
      } else {
        setUser(DefaultUser);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isInit) {
      if (
        !!authUser.id &&
        (pathname === "/register" ||
          pathname === "/register-success" ||
          pathname === "/login")
      ) {
        router.push("/");
      } else if (
        !authUser.id &&
        pathname !== "/register" &&
        pathname !== "/register-success" &&
        pathname !== "/login"
      ) {
        router.push("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInit, pathname, authUser.id]);

  const getUserByDatabase = async (id: User["id"]) => {
    try {
      if (!!id) {
        const user = await apiClient.get(`/users/${id}`);
        return user.data;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const updateUser = async (user: User) => {
    const { id, name, profile } = user;
    try {
      const updatedUser = await apiClient.put(`/users/${id}`, {
        name,
        profile,
      });
      setUser(updatedUser.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const getProfileImg = (user: User) => {
    if (!!user.profile?.profileSrc && user.profile?.profileSrc !== "") {
      const { data } = supabase.storage
        .from("profileImg")
        .getPublicUrl(`img/${user.profile?.profileSrc}`);

      return data.publicUrl;
    } else {
      return "";
    }
  };

  const uploadProfileImg = async (file: File, fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from("profileImg")
        .upload(`img/${fileName}`, file);
      if (error) {
        throw error;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      handleCloseSnackbar();
      if (error) {
        throw error;
      }
    } catch (err: AuthError | unknown) {
      if (err instanceof AuthError) {
        console.error("エラーが発生しました\n", err.message);
        handleOpenSnackbar({
          type: SNACKBAR_TYPE.ERROR,
          message: err.message,
        });
      } else {
        console.error("予期しないエラーが発生しました\n", err);
      }
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      handleCloseSnackbar();
      if (error) {
        throw error;
      } else if (data.user?.identities?.length === 0) {
        throw new Error("すでに登録済みのメールアドレスです");
      }
    } catch (err: AuthError | Error | unknown) {
      if (err instanceof AuthError || err instanceof Error) {
        console.error("エラーが発生しました\n", err.message);
        handleOpenSnackbar({
          type: SNACKBAR_TYPE.ERROR,
          message: err.message,
        });
      } else {
        console.error("予期しないエラーが発生しました\n", err);
      }
      return err;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
        getUserByDatabase,
        updateUser,
        getProfileImg,
        uploadProfileImg,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
