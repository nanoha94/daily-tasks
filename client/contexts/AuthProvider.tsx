"use client";
import apiClient from "@/lib/apiClient";
import { DefaultUser, User } from "@/types/user";
import { supabase } from "@/utils/supabase";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, name: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: DefaultUser,
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
  const [user, setUser] = useState<AuthContextType["user"]>(DefaultUser);
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
          ...user,
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
    console.log(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!!user.id && (pathname === "/register" || pathname === "/login")) {
      router.push("/");
    } else if (!user.id && pathname !== "/register" && pathname !== "/login") {
      router.push("/login");
    }
  }, [user]);

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
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      <div className="flex flex-col h-screen">{children}</div>
    </AuthContext.Provider>
  );
};
