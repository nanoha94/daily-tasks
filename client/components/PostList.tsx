import { usePosts } from "@/contexts/PostsProvider";
import PostItem from "./PostItem";
import { useSearchParams } from "next/navigation";

interface Props {
  userId?: string;
}

const PostList = ({ userId }: Props) => {
  const searchParams = useSearchParams();
  const searchTextParam = searchParams.get("search");
  const searchCategoryParam = searchParams.get("category");
  const { allPosts } = usePosts();
  // const filterdPosts = allPosts.map((post) => {
  //   if(!!searchCategoryParam )
  // })

  return (
    <ul className="flex flex-col gap-y-2">
      {!!allPosts &&
        allPosts.map((post) =>
          !!userId ? (
            userId === post.author.id && (
              <li key={post.id}>
                <PostItem post={post} />
              </li>
            )
          ) : (
            <li key={post.id}>
              <PostItem post={post} />
            </li>
          )
        )}
    </ul>
  );
};

export default PostList;
