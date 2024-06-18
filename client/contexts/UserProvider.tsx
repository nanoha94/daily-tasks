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
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  authUser: DefaultUser,
  getUser: async () => undefined,
  updateUser: async () => {},
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
  const [authUser, setUser] =
    useState<UserContextType["authUser"]>(DefaultUser);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getUser();

      if (!!data.user) {
        try {
          const authorizedUser = await apiClient.get(`/users/${data.user.id}`);
          setUser(authorizedUser.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchData();

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser({
          ...authUser,
          id: session.user?.id,
        });
      } else {
        setUser(DefaultUser);
      }
    });

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
    if (!!authUser.id && (pathname === "/register" || pathname === "/login")) {
      router.push("/");
    } else if (
      !authUser.id &&
      pathname !== "/register" &&
      pathname !== "/login"
    ) {
      router.push("/login");
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
      console.log(err);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
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
      value={{ authUser, getUser, updateUser, signIn, signUp, signOut }}
    >
      {children}
    </UserContext.Provider>
  );
};