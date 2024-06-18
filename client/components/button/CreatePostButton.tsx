"use client";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useDrawer } from "@/contexts/DrawerProvider";
import EditPost from "../drawer/EditPost";

const CreatePostButton = () => {
  const { handleOpenDrawer } = useDrawer();

  return (
    <button
      type="button"
      onClick={() => handleOpenDrawer({ drawer: <EditPost /> })}
      className="fixed bottom-2 right-2 text-white bg-green rounded-full border-4 border-transparent p-1 hover:text-green hover:bg-white hover:border-green"
    >
      <AddRoundedIcon className="text-4xl" />
    </button>
  );
};

export default CreatePostButton;
