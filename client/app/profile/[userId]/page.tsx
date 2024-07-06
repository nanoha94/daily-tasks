"use client";
import Header from "@/components/Header";
import PostList from "@/components/PostList";
import Profile from "@/components/Profile";
import SelectForSort from "@/components/SelectForSort";
import Snackbar from "@/components/Snackbar";
import CreatePostButton from "@/components/button/CreatePostButton";
import Dialog from "@/components/dialog/Dialog";
import FullscreenDrawer from "@/components/drawer/FullscreenDrawer";
import SelectCategory from "@/components/filter/SelectCategory";
import { useUser } from "@/contexts/UserProvider";
import { POST_CATEGORIES, POST_CATEGORY, POST_ORDERS } from "@/costants/posts";
import { mediaQuery, useMediaQuery } from "@/hooks/useMediaQuery";
import { DefaultUser, User } from "@/types/user";
import { useEffect, useState } from "react";

interface Props {
  params: { userId: string };
}

const Page = ({ params }: Props) => {
  const isPc: boolean = useMediaQuery(mediaQuery.md);
  const [profileUser, setProfileUser] = useState<User>(DefaultUser);
  const { getUserByDatabase } = useUser();
  const [filterParam, setFilterParam] = useState<{ category: number }>({
    category: POST_CATEGORY.ALL,
  });
  const [sortParam, setSortParam] = useState<string>(POST_ORDERS[0].value);

  const handleChangeSearchCategory = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value !== "all") {
      setFilterParam({
        category:
          POST_CATEGORIES.find((category) => category.key === e.target.value)
            ?.id ?? POST_CATEGORY.ALL,
      });
    } else {
      setFilterParam({
        category: POST_CATEGORY.ALL,
      });
    }
  };

  const handleChangeSortOrder = (value: string) => {
    setSortParam(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getUserByDatabase(params.userId);
      if (!!currentUser) {
        setProfileUser(currentUser);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.userId]);

  return (
    <>
      <Header />
      <div className="flex-1 bg-bg">
        <div className="max-w-[960px] w-full pb-3 mx-auto md:flex md:justify-center md:items-start md:gap-x-6 md:py-5 md:px-4">
          <Profile user={profileUser} />
          <div className="max-w-[560px] flex flex-col gap-y-2 mx-auto px-3 md:w-3/5 ">
            <form className="flex flex-wrap justify-between gap-5 py-3 md:pt-0">
              <SelectCategory handleChange={handleChangeSearchCategory} />
              <SelectForSort handleChange={handleChangeSortOrder} />
            </form>
            <PostList
              userId={profileUser.id}
              filterParam={filterParam}
              sortParam={sortParam}
            />
          </div>
        </div>
      </div>
      {!isPc && <CreatePostButton />}
      <FullscreenDrawer />
      <Dialog />
      <Snackbar />
    </>
  );
};

export default Page;
