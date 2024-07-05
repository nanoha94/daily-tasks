"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
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
      <PlusIcon className="w-[36px]" strokeWidth={2} />
    </button>
  );
};

export default CreatePostButton;
