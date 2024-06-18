"use client";
import { useDrawer } from "@/contexts/DrawerProvider";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Dialog from "../dialog/Dialog";
import PrimaryButton from "../button/PrimaryButton";
import styled from "styled-components";

const StyledPrimaryButton = styled(PrimaryButton)`
  flex: 1;
  width: 140px;
`;

const FullscreenDrawer = () => {
  const { drawer, isOpenDrawer, handleCloseDrawer, isEditing } = useDrawer();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const handleClose = () => {
    if (isEditing) {
      setIsOpenDialog(true);
    } else {
      handleCloseDrawer();
    }
  };

  const handleDelete = () => {
    setIsOpenDialog(false);
    handleCloseDrawer();
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
            <CloseIcon />
          </button>
          <div className="max-w-[600px] w-full mx-auto">{drawer}</div>
        </div>
      </div>
      <Dialog isOpen={isOpenDialog}>
        <p className="text-xl text-black text-center">
          編集内容を破棄しますか？
        </p>
        <div className="flex justify-center flex-wrap gap-5 mx-auto">
          <StyledPrimaryButton
            variant="cancel"
            onClick={() => {
              setIsOpenDialog(false);
            }}
          >
            キャンセル
          </StyledPrimaryButton>
          <StyledPrimaryButton variant="destroy" onClick={handleDelete}>
            破棄する
          </StyledPrimaryButton>
        </div>
      </Dialog>
    </>
  );
};

export default FullscreenDrawer;
