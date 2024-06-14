import { POST_CATEGORIES } from "@/costants/posts";
import { Post } from "@/types/post";
import ProfileIcon from "./ProfileIcon";
import Link from "next/link";
import styled from "styled-components";
import { colors } from "@/tailwind.config";
import GoodButton from "./button/GoodButton";
import styles from "@/styles/form.module.css";

interface Props {
  post: Post;
}

interface CategoryLabelProps {
  $category: Post["category"];
}

const CategoryLabelColor = ($category: CategoryLabelProps["$category"]) => {
  if ($category === "task") {
    return colors.black;
  } else {
    return colors.white;
  }
};

const CategoryLabelBgColor = ($category: CategoryLabelProps["$category"]) => {
  if ($category === "task") {
    return colors.bg;
  } else {
    return colors.dark_blue;
  }
};

const StyledProfileIcon = styled(ProfileIcon)`
  width: 32px;
`;

const CategoryLabel = styled.span<CategoryLabelProps>`
  padding: 6px 8px 4px;
  width: fit-content;
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0.05em;
  font-weight: bold;
  color: ${({ $category }) => CategoryLabelColor($category)};
  background-color: ${({ $category }) => CategoryLabelBgColor($category)};
  border-radius: 8px;
`;

const PostItem = ({ post }: Props) => {
  const createdAt = new Date(post.createdAt);
  const handleClickNumOfGood = () => {
    // TODO: いいね数を更新する
  };

  return (
    <div className="flex flex-col gap-y-5 rounded bg-white shadow-sm p-3 mx-auto">
      <div className="flex">
        <Link
          href={`/profile/${post.author.id}`}
          className="flex flex-1 items-center gap-x-2 transition-opacity hover:opacity-70"
        >
          <StyledProfileIcon imgSrc={post.author.profile?.profileScr} />
          <p className="text-xs text-black">{post.author.name}</p>
        </Link>
        <span className="text-xs text-gray-700">
          {`
          ${createdAt.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })} ${createdAt.toLocaleTimeString("en-US")}`}
        </span>
      </div>
      <div className="flex flex-col gap-y-2">
        <CategoryLabel $category={post.category}>
          {POST_CATEGORIES.find((cat) => cat.key === post.category)?.label}
        </CategoryLabel>
        {post.comment && <p className="text-base text-black">{post.comment}</p>}
        <div className="flex flex-col gap-y-1">
          {post.tasks.map((task) => (
            <div key={task.id} className={styles.checkbox_container}>
              <input
                type="checkbox"
                id={task.id}
                checked={task.completed}
                className={styles.checkbox}
                onChange={() => {}}
              />
              <label htmlFor={task.id} className={styles.checkbox_label}>
                {task.content}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-x-2">
        <div className="flex-1">
          <GoodButton count={post.numOfGood} onClick={handleClickNumOfGood} />
        </div>
        {/* TODO: ダイアログ表示ボタンを配置 */}
      </div>
    </div>
  );
};

export default PostItem;
