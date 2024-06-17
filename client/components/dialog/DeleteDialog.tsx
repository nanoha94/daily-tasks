"use client";
import styled from "styled-components";
import PrimaryButton from "../button/PrimaryButton";
import Dialog from "./Dialog";
import { usePosts } from "@/contexts/PostsProvider";

const StyledPrimaryButton = styled(PrimaryButton)`
  flex: 1;
  width: 140px;
`;

const DeleteDialog = () => {
  const { editingPost, isOpenDelete, handleDeletePostDialog, deletePost } =
    usePosts();

  const handleDelete = async () => {
    if (!!editingPost) {
      await deletePost(editingPost?.id);
      handleDeletePostDialog(false);
    }
  };

  return (
    <Dialog isOpen={isOpenDelete}>
      <p className="text-xl text-black text-center">投稿を削除しますか？</p>
      <div className="flex justify-center flex-wrap gap-5 mx-auto">
        <StyledPrimaryButton
          variant="cancel"
          onClick={() => {
            handleDeletePostDialog(false);
          }}
        >
          キャンセル
        </StyledPrimaryButton>
        <StyledPrimaryButton variant="destroy" onClick={handleDelete}>
          削除する
        </StyledPrimaryButton>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
