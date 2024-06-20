"use client";
import styled from "styled-components";
import PrimaryButton from "../button/PrimaryButton";
import { usePosts } from "@/contexts/PostsProvider";
import { useDialog } from "@/contexts/DialogProvider";

const StyledPrimaryButton = styled(PrimaryButton)`
  flex: 1;
`;

const DeletePost = () => {
  const { editingPost, deletePost } = usePosts();
  const { handleCloseDialog } = useDialog();

  const handleDelete = async () => {
    if (!!editingPost) {
      await deletePost(editingPost?.id);
      handleCloseDialog();
    }
  };

  return (
    <>
      <p className="text-xl text-black text-center">投稿を削除しますか？</p>
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
          削除する
        </StyledPrimaryButton>
      </div>
    </>
  );
};

export default DeletePost;
