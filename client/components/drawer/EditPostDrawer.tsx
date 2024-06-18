"use client";
import { POST_CATEGORY } from "@/costants/posts";
import EditPost from "./EditPost";
import FullscreenDrawer from "./FullscreenDrawer";
import { usePosts } from "@/contexts/PostsProvider";
import EditReviewPost from "./EditReviewPost";
import { DrawerProvider } from "@/contexts/DrawerProvider";

const EditPostDrawer = () => {
  const { editMode, isOpenEdit, handleEditPostDrawer } = usePosts();

  return (
    <DrawerProvider>
      <FullscreenDrawer
        isOpen={isOpenEdit}
        onClose={() => handleEditPostDrawer(false)}
      >
        {editMode === POST_CATEGORY.TASK ? <EditPost /> : <EditReviewPost />}
      </FullscreenDrawer>
    </DrawerProvider>
  );
};

export default EditPostDrawer;
