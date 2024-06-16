"use client";
import PostList from "@/components/PostList";
import ProfileIcon from "@/components/ProfileIcon";
import ArrowButton from "@/components/button/ArrowButton";
import { useAuth } from "@/contexts/AuthProvider";
import apiClient from "@/lib/apiClient";
import { DefaultUser, User } from "@/types/user";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  params: { userId: string };
}

const StyledProfileIcon = styled(ProfileIcon)`
  width: 60px;
`;

const Page = ({ params }: Props) => {
  const { authUser, signOut } = useAuth();
  const [user, setUser] = useState<User>(DefaultUser);

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    }
  };

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
    <div className="flex-1 bg-bg">
      <div className="flex flex-col gap-y-5 bg-white shadow-sm p-3 mb-5">
        <div className="flex items-center">
          <div className="flex flex-col items-center gap-y-1">
            <StyledProfileIcon imgSrc={user.profile?.profileScr} />
            <p className="text-xs text-black">{user.name}</p>
          </div>
          {user.id === authUser.id && (
            <div className="flex flex-col gap-y-2">
              <ArrowButton onClick={logout}>ログアウト</ArrowButton>
              {/* リンク設定 */}
              <ArrowButton>プロフィール編集</ArrowButton>
            </div>
          )}
        </div>
        {!!user.profile?.bio && <p className="text-base">{user.profile.bio}</p>}
        <p className="text-base">
          プロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィールプロフィール
        </p>
      </div>
      <PostList userId={params.userId} />
    </div>
  );
};

export default Page;
