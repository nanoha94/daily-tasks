import { usePosts } from "@/contexts/PostsProvider";
import PostItem from "./PostItem";
import { useEffect } from "react";

interface Props {
  userId?: string;
}

const PostList = ({ userId }: Props) => {
  const { posts } = usePosts();

  return (
    <ul className="max-w-[560px] flex flex-col gap-y-2 mx-auto md:w-3/5">
      {!!posts &&
        posts.map((post) =>
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
