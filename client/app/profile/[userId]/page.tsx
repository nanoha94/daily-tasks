"use client";
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
        const authorizedUser = await apiClient.get(`/users/${params.userId}`);
        setUser(authorizedUser.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return <div>{user.name}</div>;
};

export default Page;
