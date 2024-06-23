"use client";
import Header from "@/components/Header";
import PostList from "@/components/PostList";
import CreatePostButton from "@/components/button/CreatePostButton";
import Dialog from "@/components/dialog/Dialog";
import EditPost from "@/components/drawer/EditPost";
import FullscreenDrawer from "@/components/drawer/FullscreenDrawer";
import { mediaQuery, useMediaQuery } from "@/hooks/useMediaQuery";
import { useRouter, useSearchParams } from "next/navigation";
import SearchWindow from "@/components/filter/SearchWindow";
import SelectCategory from "@/components/filter/SelectCategory";

const Page = () => {
  const isPc: boolean = useMediaQuery(mediaQuery.md);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTextParam = searchParams.get("search");
  const searchCategoryParam = searchParams.get("category");
  const queryParams = new URLSearchParams();

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      queryParams.set("search", e.target.value);
    }

    if (searchCategoryParam !== null) {
      queryParams.set("category", searchCategoryParam);
    }

    router.push(`/?${queryParams.toString()}`);
  };

  const handleChangeSearchCategory = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (searchTextParam !== null) {
      queryParams.set("search", searchTextParam);
    }

    if (e.target.value !== "all") {
      queryParams.set("category", e.target.value);
    }

    router.push(`/?${queryParams.toString()}`);
  };

  return (
    <>
      <Header />
      <div className="flex-1 bg-bg">
        <div className="max-w-[960px] w-full py-3 mx-auto md:flex md:justify-center md:items-start md:gap-x-6 md:py-5 md:px-4">
          {isPc && (
            <div className="md:block md:min-w-[300px] md:w-2/5 md:bg-white md:rounded md:shadow-sm md:py-5 md:px-4">
              <EditPost />
            </div>
          )}
          <div className="max-w-[560px] flex flex-col gap-y-2 mx-auto px-3 md:w-3/5 ">
            <form className="flex flex-col gap-y-5 py-3 md:pt-0">
              <SearchWindow handleChange={handleChangeSearchText} />
              <SelectCategory
                selected={searchCategoryParam}
                handleChange={handleChangeSearchCategory}
              />
            </form>
            <PostList />
          </div>
        </div>
      </div>{" "}
      {!isPc && <CreatePostButton />}
      <FullscreenDrawer />
      <Dialog />
    </>
  );
};

export default Page;
