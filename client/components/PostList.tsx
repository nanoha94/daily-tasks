import { usePosts } from "@/contexts/PostsProvider";
import PostItem from "./PostItem";

interface Props {
  userId?: string;
}

const PostList = ({ userId }: Props) => {
  const { allPosts } = usePosts();

  return (
    <ul className="max-w-[560px] flex flex-col gap-y-2 mx-auto md:w-3/5">
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
