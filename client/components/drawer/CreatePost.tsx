import styles from "@/styles/form.module.css";
import PrimaryButton from "../button/PrimaryButton";
import Textarea from "../form/Textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { Task } from "@/types/task";
import Checkbox from "../form/Checkbox";
import AddButton from "../button/AddButton";
import { useState } from "react";

interface FormValues {
  comment: string;
  tasks: Task[];
}

const CreatePost = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: null, content: "", completed: false },
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleAddTask = () => {
    console.log("click");
    setTasks([...tasks, { id: null, content: "", completed: false }]);
  };

  const handleSubmitSuccess: SubmitHandler<FormValues> = ({
    comment,
    tasks,
  }: FormValues) => {
    console.log(comment, tasks);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSuccess)}
      className="flex flex-col gap-y-5"
    >
      <Textarea
        label="今日のひとこと"
        memo="250文字以内で入力してください。"
        placeholder="今日の意気込みは？"
        {...register("comment")}
      />
      <div className="flex flex-col gap-y-2">
        <div className={styles.container}>
          <div className={styles.label_container}>
            <p className={styles.label}>今日のタスク</p>
            <p className={styles.memo}>各30文字以内で入力してください。</p>
          </div>
          {tasks?.map((task, idx) => (
            <Checkbox
              key={idx}
              id="test"
              label={task.content}
              placeholder="今日のタスクは？"
              checked={task.completed}
              isEdit={true}
              {...register(`tasks`)}
            />
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
