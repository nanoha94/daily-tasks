import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FullscreenDrawer from "./FullscreenDrawer";
import { useState } from "react";
import CreatePost from "./CreatePost";
import { Post } from "@/types/post";

interface Props {
  updatePost: (post: Post) => void;
}

const CreatePostDrawer = ({ updatePost }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDrawer = (state: boolean) => {
    setIsOpen(state);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => handleToggleDrawer(true)}
        className="fixed bottom-2 right-2 text-white bg-green rounded-full border-4 border-transparent p-1 hover:text-green hover:bg-white hover:border-green"
      >
        <AddRoundedIcon className="text-4xl" />
      </button>
      <FullscreenDrawer
        isOpen={isOpen}
        onClose={() => handleToggleDrawer(false)}
      >
        <CreatePost updatePost={updatePost} />
      </FullscreenDrawer>
    </>
  );
};

export default CreatePostDrawer;
