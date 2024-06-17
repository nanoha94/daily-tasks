"use client";
import { POST_CATEGORY } from "@/costants/posts";
import EditPost from "./EditPost";
import FullscreenDrawer from "./FullscreenDrawer";
import { usePosts } from "@/contexts/PostsProvider";
import EditReviewPost from "./EditReviewPost";

const EditPostDrawer = () => {
  const { editMode, isOpenEdit, handleEditPostDrawer } = usePosts();

  return (
    <>
      <FullscreenDrawer
        isOpen={isOpenEdit}
        onClose={() => handleEditPostDrawer(false)}
      >
        {editMode === POST_CATEGORY.TASK ? <EditPost /> : <EditReviewPost />}
      </FullscreenDrawer>
    </>
  );
};

export default EditPostDrawer;
