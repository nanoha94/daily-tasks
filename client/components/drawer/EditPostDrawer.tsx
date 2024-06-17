import EditPost from "./EditPost";
import FullscreenDrawer from "./FullscreenDrawer";
import { usePosts } from "@/contexts/PostsProvider";

const EditPostDrawer = () => {
  const { isOpenEdit, handleEditPostDrawer } = usePosts();

  return (
    <>
      <FullscreenDrawer
        isOpen={isOpenEdit}
        onClose={() => handleEditPostDrawer(false)}
      >
        <EditPost />
      </FullscreenDrawer>
    </>
  );
};

export default EditPostDrawer;
