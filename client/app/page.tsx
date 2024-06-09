"use client";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
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
      id: "post_01",
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
      <div className="title">aaa</div>
      <Header user={user} />
      <div className="flex flex-col gap-y-2 bg-bg py-2">
        {/* TODO: 後で削除（開発用に設置） */}
        <button onClick={logout}>ログアウト</button>
        <ul className="flex flex-col gap-y-2">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Page;
