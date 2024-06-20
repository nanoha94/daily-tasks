"use client";
import styles from "@/styles/form.module.css";
import PrimaryButton from "../button/PrimaryButton";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Task } from "@/types/task";
import { useUser } from "@/contexts/UserProvider";
import FormItem from "../FormItem";
import { usePosts } from "@/contexts/PostsProvider";
import { POST_CATEGORY } from "@/costants/posts";
import { useEffect, useState } from "react";
import { useDrawer } from "@/contexts/DrawerProvider";

interface FormValues {
  comment?: string;
  tasks: Task[];
}

const EditReviewPost = () => {
  const { authUser } = useUser();
  const { createPost, updatePost } = usePosts();
  const { isOpenDrawer, handleCloseDrawer, editingPost } = useDrawer();
  const { setIsEditing } = useDrawer();
  const emptyValues = {
    comment: "",
    tasks: [{ id: undefined, content: "", completed: false }],
  };
  const [defaultValues, setDefaultValues] = useState<FormValues>(emptyValues);
  // カテゴリーがTASKのままの場合は、新規投稿作成
  const isCreate = editingPost?.category === POST_CATEGORY.TASK;

  const {
    register,
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues });
  const { fields, append } = useFieldArray({
    control,
    name: "tasks",
  });
  const watchComment = watch("comment");
  const watchTasks = watch("tasks");
  const [isEnable, setIsEnable] = useState<boolean>(false);

  const handleSubmitSuccess: SubmitHandler<FormValues> = async ({
    comment,
    tasks,
  }: FormValues) => {
    if (isCreate) {
      await createPost({
        comment,
        tasks,
        category: POST_CATEGORY.REVIEW,
        numOfGood: 0,
        author: authUser,
      });
    } else {
      if (editingPost) {
        await updatePost({
          id: editingPost?.id,
          comment,
          tasks,
          category: editingPost?.category,
          numOfGood: editingPost?.numOfGood,
          author: editingPost?.author,
        });
      }
    }
    reset(emptyValues);
    handleCloseDrawer();
  };

  useEffect(() => {
    // 条件を満たすとボタンがクリックできるようになる
    // 【条件】変更がある場合
    setIsEnable(
      defaultValues.comment !== watchComment ||
        JSON.stringify(defaultValues.tasks) !== JSON.stringify(watchTasks)
    );
    setIsEditing(
      defaultValues.comment !== watchComment ||
        JSON.stringify(defaultValues.tasks) !== JSON.stringify(watchTasks)
    );
  }, [watchComment, watchTasks.map((task) => task.completed)]);

  useEffect(() => {
    if (!!editingPost) {
      const editingValues = {
        comment: isCreate ? "" : editingPost?.comment,
        tasks: editingPost?.tasks,
      };
      setDefaultValues(editingValues);
      reset(editingValues);
    } else {
      setDefaultValues(emptyValues);
      reset(emptyValues);
    }
  }, [isOpenDrawer, editingPost]);

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
        <PrimaryButton type="submit" disabled={!isEnable}>
          {isCreate ? "投稿する" : "保存する"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default EditReviewPost;
