import { usePosts } from "@/contexts/PostsProvider";
import PostItem from "./PostItem";
import { useSearchParams } from "next/navigation";
import { POST_CATEGORIES } from "@/costants/posts";

interface Props {
  userId?: string;
}

const PostList = ({ userId }: Props) => {
  const searchParams = useSearchParams();
  const searchTextParam = searchParams.get("search");
  const searchCategoryParam = searchParams.get("category");
  const { allPosts } = usePosts();

  const filterdPosts = allPosts.filter((post) => {
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
    return true;
  });

  if (filterdPosts.length > 0) {
    return (
      <ul className="flex flex-col gap-y-2">
        {filterdPosts.map(
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

export default PostList;
