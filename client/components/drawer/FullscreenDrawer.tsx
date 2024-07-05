import { useDrawer } from "@/contexts/DrawerProvider";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDialog } from "@/contexts/DialogProvider";
import DiscardData from "../dialog/DiscardData";

const FullscreenDrawer = () => {
  const { drawer, isOpenDrawer, handleCloseDrawer, isEditing } = useDrawer();
  const { handleOpenDialog } = useDialog();

  const handleClose = () => {
    if (isEditing) {
      handleOpenDialog({ dialog: <DiscardData /> });
    } else {
      handleCloseDrawer();
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 h-screen ${
          isOpenDrawer ? "max-h-screen" : "max-h-0"
        } flex flex-col items-start gap-y-5 bg-bg w-full transition-[max-height] overflow-hidden`}
      >
        <div className="w-full p-3">
          <button type="button" onClick={handleClose}>
            <XMarkIcon className="w-[24px]" strokeWidth={2} />
          </button>
          <div className="max-w-[600px] w-full mx-auto">{drawer}</div>
        </div>
      </div>
    </>
  );
};

export default FullscreenDrawer;
