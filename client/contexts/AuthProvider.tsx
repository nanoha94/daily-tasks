"use client";
import apiClient from "@/lib/apiClient";
import { DefaultUser, User } from "@/types/user";
import { supabase } from "@/utils/supabase";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  authUser: User;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, name: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  authUser: DefaultUser,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [authUser, setUser] =
    useState<AuthContextType["authUser"]>(DefaultUser);
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
    if (!!authUser.id && (pathname === "/register" || pathname === "/login")) {
      router.push("/");
    } else if (
      !authUser.id &&
      pathname !== "/register" &&
      pathname !== "/login"
    ) {
      router.push("/login");
    }
  }, [pathname, authUser]);

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
    <AuthContext.Provider value={{ authUser, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
