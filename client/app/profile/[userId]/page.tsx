"use client";
import Header from "@/components/Header";
import PostList from "@/components/PostList";
import Profile from "@/components/Profile";
import { mediaQuery, useMediaQuery } from "@/hooks/useMediaQuery";
import apiClient from "@/lib/apiClient";
import { DefaultUser, User } from "@/types/user";
import { useEffect, useState } from "react";

interface Props {
  params: { userId: string };
}

const Page = ({ params }: Props) => {
  const [user, setUser] = useState<User>(DefaultUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await apiClient.get(`/users/${params.userId}`);
        setUser(currentUser.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="flex-1 bg-bg">
        <div className="max-w-[960px] w-full py-3 mx-auto md:flex md:justify-center md:items-start md:gap-x-6 md:py-5 md:px-4">
          <Profile user={user} />
          <PostList userId={user.id} />{" "}
        </div>
      </div>
    </>
  );
};

export default Page;
