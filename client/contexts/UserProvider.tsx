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
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  authUser: DefaultUser,
  getUserByDatabase: async () => undefined,
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
  const { handleOpenSnackbar } = useSnackbar();

  useEffect(() => {
    // FIXED: setData という命名が抽象的です。
    // また getData とソースが同じ箇所があるのが違和感がございます。
    // 下のREVIEWで説明いたします。

    // FIXED: fetchData という命名が抽象的です。例) fetchSupabaseUser。

    // FIXED: fetchData は「取得」、setDataは「保存(格納)」という意味のため
    // fetchData の中で、setData をするのは少し違和感があります。
    // 下記のような流れでuserを格納するようなメソッドを作成すると可読性が上がります。
    // const supabaseUser = fetchData();
    // const user = getUser(supabaseUser);
    // setUser(user);

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

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const myUser = await getUser(authUser.id);
  //     // FIXED: setUser(myUser) ではダメでしょうか？
  //     if (!!myUser) {
  //       setUser(myUser.data);
  //     }
  //   };
  //   fetchUser();
  // }, [authUser]);

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
  }, [isInit, router, pathname, authUser.id]);

  // FIXED: getUser という命名ですと、
  // User を SupabaseAuth から取得するのか、DBから取得するのか、authUser変数をそのまま返すのか不明なため、
  // getUserByDatabase のような関数名が理想です。
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
