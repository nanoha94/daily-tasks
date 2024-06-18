"use client";
import Header from "@/components/Header";
import PostList from "@/components/PostList";
import CreatePostButton from "@/components/button/CreatePostButton";
import DeleteDialog from "@/components/dialog/DeleteDialog";
import EditPost from "@/components/drawer/EditPost";
import EditPostDrawer from "@/components/drawer/EditPostDrawer";
import { mediaQuery, useMediaQuery } from "@/hooks/useMediaQuery";

const Page = () => {
  const isPc: boolean = useMediaQuery(mediaQuery.md);

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
          <PostList />
        </div>
      </div>{" "}
      {!isPc && <CreatePostButton />}
      <EditPostDrawer />
      <DeleteDialog />
    </>
  );
};

export default Page;
