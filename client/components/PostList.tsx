import { usePosts } from "@/contexts/PostsProvider";
import PostItem from "./PostItem";
import { useSearchParams } from "next/navigation";
import { POST_CATEGORIES } from "@/costants/posts";
import { Suspense, useEffect, useState } from "react";
import { Post } from "@/types/post";

interface Props {
  userId?: string;
  filterParam?: { category: number };
  sortParam?: string;
}

const Inner = ({ userId, filterParam, sortParam }: Props) => {
  const searchParams = useSearchParams();
  const searchTextParam = searchParams.get("search");
  const searchCategoryParam = searchParams.get("category");
  const { allPosts } = usePosts();
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
      if (!!filterParam && filterParam.category !== -1) {
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

  if (filteredPosts.length > 0) {
    return (
      <ul className="flex flex-col gap-y-2">
        {/* REVIEW: こちらの条件分岐ですがどちらも同じコンポーネントを返してそうですね？ */}
        {/* ログインユーザーの投稿かどうかは PostItem の方で行っていそうです。 */}
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
    );
  } else {
    return <p>該当する投稿は見つかりません</p>;
  }
};

const PostList = ({ userId, filterParam, sortParam }: Props) => {
  return (
    <Suspense>
      <Inner userId={userId} filterParam={filterParam} sortParam={sortParam} />
    </Suspense>
  );
};

export default PostList;
