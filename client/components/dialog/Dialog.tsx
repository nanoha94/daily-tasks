"use client";
import { useDialog } from "@/contexts/DialogProvider";
import { colors } from "@/tailwind.config";
import styled from "styled-components";

const ContainerOpacity = ($isOpen: boolean) => {
  if ($isOpen) {
    return "1";
  } else {
    return "0";
  }
};

const ContainerVisibility = ($isOpen: boolean) => {
  if ($isOpen) {
    return "visible";
  } else {
    return "hidden";
  }
};

const Container = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 40%);

  opacity: ${({ $isOpen }) => ContainerOpacity($isOpen)};
  visibility: ${({ $isOpen }) => ContainerVisibility($isOpen)};
`;

const Panel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  max-width: 80%;
  width: 320px;

  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  row-gap: 60px;

  background-color: ${colors.white};
  border-radius: 8px;
`;

const Dialog = () => {
  const { dialog, isOpenDialog } = useDialog();
  return (
    <Container $isOpen={isOpenDialog}>
      <Panel>{dialog}</Panel>
    </Container>
  );
};

export default Dialog;
