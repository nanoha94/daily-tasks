"use client";
import Header from "@/components/Header";
import PostList from "@/components/PostList";
import Profile from "@/components/Profile";
import CreatePostButton from "@/components/button/CreatePostButton";
import Dialog from "@/components/dialog/Dialog";
import FullscreenDrawer from "@/components/drawer/FullscreenDrawer";
import SelectCategory from "@/components/filter/SelectCategory";
import { useUser } from "@/contexts/UserProvider";
import { POST_CATEGORIES } from "@/costants/posts";
import { mediaQuery, useMediaQuery } from "@/hooks/useMediaQuery";
import { DefaultUser, User } from "@/types/user";
import { useEffect, useState } from "react";

interface Props {
  params: { userId: string };
}

const Page = ({ params }: Props) => {
  const isPc: boolean = useMediaQuery(mediaQuery.md);
  const [user, setUser] = useState<User>(DefaultUser);
  const { authUser, getUser } = useUser();
  const [filterParam, setFilterParam] = useState<{ category: number }>({
    category: -1,
  });

  const handleChangeSearchCategory = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value !== "all") {
      setFilterParam({
        category:
          POST_CATEGORIES.find((category) => category.key === e.target.value)
            ?.id ?? -1,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getUser(params.userId);
      if (!!currentUser) {
        setUser(currentUser);
      }
    };
    fetchData();
  }, [authUser]);

  return (
    <>
      <Header />
      <div className="flex-1 bg-bg">
        <div className="max-w-[960px] w-full pb-3 mx-auto md:flex md:justify-center md:items-start md:gap-x-6 md:py-5 md:px-4">
          <Profile user={user} />
          <div className="max-w-[560px] flex flex-col gap-y-2 mx-auto px-3 md:w-3/5 ">
            <form className="flex flex-col gap-y-5 py-3 md:pt-0">
              <SelectCategory handleChange={handleChangeSearchCategory} />
            </form>
            <PostList userId={user.id} filterParam={filterParam} />
          </div>
        </div>
      </div>
      {!isPc && <CreatePostButton />}
      <FullscreenDrawer />
      <Dialog />
    </>
  );
};

export default Page;
