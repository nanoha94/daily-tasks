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

    // REVIEW: setData という命名が抽象的です。
    // また getData とソースが同じ箇所があるのが違和感がございます。
    // 下のREVIEWで説明いたします。
    const setData = async (id: string) => {
      try {
        const user = await apiClient.get(`/users/${id}`);
        setUser(user.data);
      } catch (err) {
        console.error(err);
      }
    };

    // REVIEW: fetchData という命名が抽象的です。例) fetchSupabaseUser。
    const fetchData = async () => {
      const { data } = await supabase.auth.getUser();

      if (!!data.user) {
        setData(data.user.id);
      }
    };

    // REVIEW: fetchData は「取得」、setDataは「保存(格納)」という意味のため
    // fetchData の中で、setData をするのは少し違和感があります。
    // 下記のような流れでuserを格納するようなメソッドを作成すると可読性が上がります。
    // const supabaseUser = fetchData();
    // const user = getUser(supabaseUser);
    // setUser(user);
    fetchData();

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        // REVIEW: 上記の修正を行うと下記のような記述になると思われます。
        // const user = getUser(session.user.id)
        // setUser(user);
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
      // REVIEW: setUser(myUser) ではダメでしょうか？
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

      // REVIEW: 上記少し理解しずらかったので下記にリファクタリングしたものを記述しました。（動作未確認）
      // 少し複雑なロジックの場合はコメントも記述すると良いです。

      // // 認証系のパスのリダイレクトについて
      // if (pathname === "/register" || pathname === "/login") {
      //   if (!!authUser.id) router.push("/"); // ログイン済であればホーム画面へ
      // } else {
      //   if (!authUser.id) router.push("/login"); // 未ログインであればログイン画面へ
      // }
    }
  }, [pathname, authUser.id]);

  // REVIEW: getUser という命名ですと、
  // User を SupabaseAuth から取得するのか、DBから取得するのか、authUser変数をそのまま返すのか不明なため、
  // getUserByDatabase のような関数名が理想です。
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
