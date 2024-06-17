"use client";
import styles from "@/styles/form.module.css";
import PrimaryButton from "../button/PrimaryButton";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Task } from "@/types/task";
import AddButton from "../button/AddButton";
import { useAuth } from "@/contexts/AuthProvider";
import FormItem from "../FormItem";
import { usePosts } from "@/contexts/PostsProvider";
import { POST_CATEGORY } from "@/costants/posts";
import { useEffect } from "react";

interface FormValues {
  comment?: string;
  tasks: Task[];
}

const EditReviewPost = () => {
  const { authUser } = useAuth();
  const {
    editingPost,
    isOpenEdit,
    handleEditPostDrawer,
    createPost,
    updatePost,
  } = usePosts();
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

  const handleSubmitSuccess: SubmitHandler<FormValues> = async ({
    comment,
    tasks,
  }: FormValues) => {
    console.log(comment, tasks);
    if (!!editingPost?.comment) {
      console.log("update");
      // await updatePost({
      //   id: editingPost?.id,
      //   comment,
      //   tasks,
      //   category: editingPost?.category,
      //   numOfGood: editingPost?.numOfGood,
      //   author: editingPost?.author,
      // });
    } else {
      console.log("create");
      await createPost({
        comment,
        tasks,
        category: POST_CATEGORY.REVIEW,
        numOfGood: 0,
        author: authUser,
      });
    }
    reset(defaultValues);
    handleEditPostDrawer(false);
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
      <FormItem label="今日の振り返り" memo="250文字以内で入力してください。">
        <textarea
          rows={4}
          placeholder="今日を振り返ってどうでしたか？"
          {...register("comment")}
          className={`${styles.item} ${styles.item_frame}`}
        />
      </FormItem>
      <div className="flex flex-col gap-y-2">
        <div className={styles.container}>
          <div className={styles.label_container}>
            <p className={styles.label}>今日のタスク</p>
            <p className={styles.memo}>
              完了したタスクにチェックしてください。
            </p>
          </div>
          {fields.map((field, idx) => (
            <div key={field.id} className={styles.checkbox_container}>
              <input
                type="checkbox"
                id={field.id}
                defaultChecked={field.completed}
                {...register(`tasks.${idx}.completed`)}
                className={styles.checkbox}
              />
              <label htmlFor={field.id} className={styles.checkbox_label}>
                {field.content}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="ml-auto mr-0">
        <PrimaryButton type="submit">
          {!!editingPost?.comment ? "保存する" : "投稿する"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default EditReviewPost;
