import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FullscreenDrawer from "./FullscreenDrawer";
import { useState } from "react";
import EditPost from "./EditPost";
import { usePosts } from "@/contexts/PostsProvider";

const CreatePostDrawer = () => {
  const { isOpenEdit, handleEditPostDrawer } = usePosts();

  return (
    <>
      <button
        type="button"
        onClick={() => handleEditPostDrawer(true)}
        className="fixed bottom-2 right-2 text-white bg-green rounded-full border-4 border-transparent p-1 hover:text-green hover:bg-white hover:border-green"
      >
        <AddRoundedIcon className="text-4xl" />
      </button>
      <FullscreenDrawer
        isOpen={isOpenEdit}
        onClose={() => handleEditPostDrawer(false)}
      >
        <EditPost />
      </FullscreenDrawer>
    </>
  );
};

export default CreatePostDrawer;
