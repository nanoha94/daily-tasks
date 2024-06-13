"use client";
import Header from "@/components/Header";
import PostItem from "@/components/PostItem";
import CreatePost from "@/components/drawer/CreatePost";
import CreatePostDrawer from "@/components/drawer/CreatePostDrawer";
import { useAuth } from "@/contexts/AuthProvider";

const Page = () => {
  const { signOut } = useAuth();

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    }
  };

  const profile = {
    id: "profile_01",
    bio: "",
    profileScr: "",
  };

  const user = {
    id: "user_01",
    name: "user-name",
    posts: null,
    profile,
  };

  const tasks = [
    {
      id: "task_01",
      content: "タスク１",
      completed: false,
    },
    {
      id: "task_02",
      content: "タスク２",
      completed: false,
    },
  ];

  const posts = [
    {
      id: "post_01",
      comment:
        "コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント",
      tasks,
      category: "task",
      numOfGood: 0,
      author: user,
      createdAt: new Date("2024-06-09 08:00:00"),
    },
    {
      id: "post_02",
      comment:
        "コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント",
      tasks,
      category: "review",
      numOfGood: 12,
      author: user,
      createdAt: new Date("2024-06-09 18:00:00"),
    },
  ];

  return (
    <>
      {/* TODO: 後で削除（開発用に設置） */}
      <button onClick={logout}>ログアウト</button>
      <Header user={user} />
      <div className="flex-1 bg-bg">
        <div className="max-w-[960px] w-fit py-3 mx-auto md:flex md:justify-center md:items-start md:gap-x-6 md:py-5 md:px-4">
          <div className="hidden md:block md:min-w-[300px] md:w-2/5 md:bg-white md:rounded md:shadow-sm md:py-5 md:px-4">
            <CreatePost />
          </div>
          <ul className="flex flex-col gap-y-2 mx-auto md:w-3/5">
            {posts.map((post) => (
              <li key={post.id}>
                <PostItem post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:hidden">
        <CreatePostDrawer />
      </div>
    </>
  );
};

export default Page;
