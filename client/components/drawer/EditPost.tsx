import styles from "@/styles/form.module.css";
import PrimaryButton from "../button/PrimaryButton";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Task } from "@/types/task";
import AddButton from "../button/AddButton";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/contexts/AuthProvider";
import { Post } from "@/types/post";
import FormItem from "../FormItem";
import { usePosts } from "@/contexts/PostsProvider";
import { POST_CATEGORY, POST_MODE } from "@/costants/posts";
import { useEffect } from "react";
import { create } from "domain";

// interface Props {
//   mode?: POST_MODE;
//   post?: Post;
// }

interface FormValues {
  comment?: string;
  tasks: Task[];
}

const EditPost = () => {
  const { authUser } = useAuth();
  const { editingPost, isOpenEdit, setIsOpenEdit, addPosts, updatePosts } =
    usePosts();
  const defaultValues = {
    comment: "",
    tasks: [{ id: undefined, content: "", completed: false }],
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });
  const { fields, append } = useFieldArray({
    control,
    name: "tasks",
  });

  const handleAddTask = () => {
    append(defaultValues["tasks"]);
  };

  const createPost = async ({ comment, tasks }: FormValues) => {
    const newPost = await apiClient.post("/posts", {
      comment,
      tasks,
      category: POST_CATEGORY.TASK,
      numOfGood: 0,
      authorId: authUser?.id,
    });
    addPosts(newPost.data);
  };

  const updatePost = async ({ comment, tasks }: FormValues) => {
    if (!!editingPost && !!editingPost.id) {
      const updatedPost = await apiClient.put(`/posts/${editingPost?.id}`, {
        comment,
        tasks,
        category: POST_CATEGORY.TASK,
        numOfGood: 0,
        authorId: authUser?.id,
      });

      updatePosts(updatedPost.data);
    }
  };

  const handleSubmitSuccess: SubmitHandler<FormValues> = async ({
    comment,
    tasks,
  }: FormValues) => {
    try {
      if (!!editingPost) {
        await updatePost({ comment, tasks });
      } else {
        await createPost({ comment, tasks });
      }
      reset(defaultValues);
      setIsOpenEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpenEdit && !!editingPost) {
      const currentValues = {
        comment: editingPost?.comment,
        tasks: editingPost?.tasks,
      };
      reset(currentValues);
    } else {
      reset(defaultValues);
    }
  }, [isOpenEdit, editingPost]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSuccess)}
      className="flex flex-col gap-y-5"
    >
      <FormItem label="今日のひとこと" memo="250文字以内で入力してください。">
        <textarea
          rows={4}
          placeholder="今日の意気込みは？"
          {...register("comment")}
          className={`${styles.item} ${styles.item_frame}`}
        />
      </FormItem>
      <div className="flex flex-col gap-y-2">
        <div className={styles.container}>
          <div className={styles.label_container}>
            <p className={styles.label}>今日のタスク</p>
            <p className={styles.memo}>各30文字以内で入力してください。</p>
          </div>
          {fields.map((field, idx) => (
            <div
              key={field.id}
              className={`${styles.checkbox_container} ${styles.item_frame_sm}`}
            >
              <input
                type="checkbox"
                // dafaultCheckedにすると、ON/OFFが切り替えられる
                // defaultChecked={field.completed}
                checked={false}
                {...register(`tasks.${idx}.completed`)}
                className={styles.checkbox}
              />
              <input
                placeholder="今日のタスクは？"
                className={styles.item}
                {...register(`tasks.${idx}.content`)}
              />
            </div>
          ))}
        </div>
        <AddButton onClick={handleAddTask}>タスクを追加する</AddButton>
      </div>
      <div className="ml-auto mr-0">
        <PrimaryButton type="submit">投稿する</PrimaryButton>
      </div>
    </form>
  );
};

export default EditPost;
