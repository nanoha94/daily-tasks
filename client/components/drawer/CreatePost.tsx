import styles from "@/styles/form.module.css";
import PrimaryButton from "../button/PrimaryButton";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Task } from "@/types/task";
import AddButton from "../button/AddButton";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/contexts/AuthProvider";
import { Post } from "@/types/post";
import FormItem from "../FormItem";

interface Props {
  addPost: (post: Post) => void;
}

interface FormValues {
  comment: string;
  tasks: Task[];
}

const CreatePost = ({ addPost }: Props) => {
  const { user } = useAuth();
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
  } = useForm<FormValues>({
    defaultValues,
  });
  const { fields, append } = useFieldArray({
    name: "tasks",
    control,
  });

  const handleAddTask = () => {
    append(defaultValues["tasks"]);
  };

  const handleSubmitSuccess: SubmitHandler<FormValues> = async ({
    comment,
    tasks,
  }: FormValues) => {
    try {
      const newPost = await apiClient.post("/posts", {
        comment,
        tasks,
        category: "task",
        numOfGood: 0,
        authorId: user?.id,
      });
      addPost(newPost.data);
      reset(defaultValues);
    } catch (err) {
      console.error(err);
    }
  };

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
                value={field.content}
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

export default CreatePost;
