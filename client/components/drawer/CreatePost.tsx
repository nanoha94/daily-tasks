import PrimaryButton from "../button/PrimaryButton";
import TaskEditor from "../TaskEditor";
import Textarea from "../form/Textarea";

const CreatePost = () => {
  return (
    <form className="flex flex-col gap-y-5">
      <Textarea
        label="今日のひとこと"
        memo="250文字以内で入力してください。"
        placeholder="今日の意気込みは？"
      />
      <TaskEditor />
      <div className="ml-auto mr-0">
        <PrimaryButton type="submit">投稿する</PrimaryButton>
      </div>
    </form>
  );
};

export default CreatePost;
