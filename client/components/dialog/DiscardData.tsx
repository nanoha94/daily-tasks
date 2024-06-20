"use client";
import styled from "styled-components";
import PrimaryButton from "../button/PrimaryButton";
import { useDialog } from "@/contexts/DialogProvider";
import { useDrawer } from "@/contexts/DrawerProvider";

const StyledPrimaryButton = styled(PrimaryButton)`
  flex: 1;
`;

const DiscardData = () => {
  const { handleCloseDrawer } = useDrawer();
  const { handleCloseDialog } = useDialog();

  const handleDelete = () => {
    handleCloseDialog();
    handleCloseDrawer();
  };

  return (
    <>
      <p className="text-xl text-black text-center">編集内容を破棄しますか？</p>
      <div className="w-full flex justify-center flex-wrap gap-5 mx-auto">
        <StyledPrimaryButton
          variant="cancel"
          onClick={() => {
            handleCloseDialog();
          }}
        >
          キャンセル
        </StyledPrimaryButton>
        <StyledPrimaryButton variant="destroy" onClick={handleDelete}>
          破棄する
        </StyledPrimaryButton>
      </div>
    </>
  );
};

export default DiscardData;
