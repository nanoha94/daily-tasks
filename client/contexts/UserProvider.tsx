"use client";
import apiClient from "@/lib/apiClient";
import { DefaultUser, User } from "@/types/user";
import { supabase } from "@/utils/supabase";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  authUser: User;
  getUser: (id: User["id"]) => Promise<User | undefined>;
  updateUser: (user: User) => Promise<void>;
  getProfileImg: (user: User) => string;
  uploadProfileImg: (file: File, fileName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  authUser: DefaultUser,
  getUser: async () => undefined,
  updateUser: async () => {},
  getProfileImg: () => "",
  uploadProfileImg: async () => {},
  signIn: async () => {},
  signUp: async () => {},
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

  useEffect(() => {
    const setData = async (id: string) => {
      try {
        const user = await apiClient.get(`/users/${id}`);
        setUser(user.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchData = async () => {
      const { data } = await supabase.auth.getUser();

      if (!!data.user) {
        setData(data.user.id);
      }
    };
    fetchData();

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setData(session.user.id);
      } else {
        setUser(DefaultUser);
      }
    });

    setIsInit(false);

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const myUser = getUser(authUser.id);
      setUser({ ...authUser, ...myUser });
    };
    fetchUser();
  }, [authUser.id]);

  useEffect(() => {
    if (!isInit) {
      if (
        !!authUser.id &&
        (pathname === "/register" || pathname === "/login")
      ) {
        router.push("/");
      } else if (
        !authUser.id &&
        pathname !== "/register" &&
        pathname !== "/login"
      ) {
        router.push("/login");
      }
    }
  }, [pathname, authUser.id]);

  const getUser = async (id: User["id"]) => {
    try {
      const user = await apiClient.get(`/users/${id}`);
      return user.data;
    } catch (err) {
      console.error(err);
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
        getUser,
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
