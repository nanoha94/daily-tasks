import { usePosts } from "@/contexts/PostsProvider";
import PostItem from "./PostItem";
import { useSearchParams } from "next/navigation";
import { POST_CATEGORIES, POST_CATEGORY } from "@/costants/posts";
import React, { Suspense, useEffect, useState } from "react";
import { Post } from "@/types/post";

interface Props {
  userId?: string;
  filterParam?: { category: number };
  sortParam?: string;
}

const NullList = () => {
  return (
    <div className="flex flex-col gap-y-2">
      {Array.from({ length: 10 }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-y-5 rounded bg-white shadow-sm p-3 mx-auto w-full"
        >
          <div className="animate-pulse flex gap-4">
            <div className="rounded-full bg-gray-400 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-gray-400 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-gray-400 rounded col-span-2"></div>
                  <div className="h-2 bg-gray-400 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Inner = ({ userId, filterParam, sortParam }: Props) => {
  const searchParams = useSearchParams();
  const searchTextParam = searchParams.get("search");
  const searchCategoryParam = searchParams.get("category");
  const { processingFetchAllPosts, allPosts } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(allPosts);

  useEffect(() => {
    const posts = allPosts.filter((post) => {
      if (!!searchTextParam) {
        if (
          !(
            post.comment?.includes(searchTextParam) ||
            post.tasks.some((task) => task.content.includes(searchTextParam))
          )
        ) {
          return false;
        }
      }
      if (!!searchCategoryParam) {
        const categoryId = POST_CATEGORIES.find(
          (category) => category.key === searchCategoryParam
        )?.id;
        if (post.category !== categoryId) {
          return false;
        }
      }
      if (!!filterParam && filterParam.category !== POST_CATEGORY.ALL) {
        if (post.category !== filterParam?.category) {
          return false;
        }
      }

      return true;
    });

    if (!!sortParam && sortParam === "sortByOld") {
      setFilteredPosts(posts.reverse());
    }
    setFilteredPosts(posts);
  }, [searchTextParam, searchCategoryParam, filterParam, sortParam, allPosts]);

  return (
    <>
      {processingFetchAllPosts ? (
        <NullList />
      ) : filteredPosts.length > 0 ? (
        <ul className="flex flex-col gap-y-2">
          {filteredPosts.map(
            (post) =>
              post &&
              (!!userId ? (
                userId === post.author.id && (
                  <li key={post.id}>
                    <PostItem post={post} />
                  </li>
                )
              ) : (
                <li key={post.id}>
                  <PostItem post={post} />
                </li>
              ))
          )}
        </ul>
      ) : (
        <p>該当する投稿は見つかりません</p>
      )}
    </>
  );
};

const PostList = ({ userId, filterParam, sortParam }: Props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Inner userId={userId} filterParam={filterParam} sortParam={sortParam} />
    </Suspense>
  );
};

export default PostList;
