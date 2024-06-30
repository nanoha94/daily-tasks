import { useSnackbar } from "@/contexts/SnackbarProvider";
import { SNACKBAR_TYPE } from "@/costants/snackbar";
import { colors } from "@/tailwind.config";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import styled from "styled-components";

interface ContainerProps {
  $isOpen: boolean;
  $type: SNACKBAR_TYPE;
}

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

const bgColor = (type: ContainerProps["$type"]): string => {
  if (type === SNACKBAR_TYPE.INFO) {
    return colors.info;
  } else if (type === SNACKBAR_TYPE.ERROR) {
    return colors.error;
  }
  return colors.info;
};

const Container = styled.div<ContainerProps>`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);

  width: fit-content;
  max-width: 80%;
  padding: 8px 16px;

  display: flex;
  align-items: center;
  column-gap: 8px;
  background-color: ${({ $type }) => bgColor($type)};
  border-radius: 8px;

  opacity: ${({ $isOpen }) => ContainerOpacity($isOpen)};
  visibility: ${({ $isOpen }) => ContainerVisibility($isOpen)};
  transition: opacity 0.5s, visibility 0.5s;
`;

const Snackbar = () => {
  const { isOpenSnackbar, alertType, message } = useSnackbar();
  return (
    <Container $type={alertType} $isOpen={isOpenSnackbar}>
      {alertType === SNACKBAR_TYPE.INFO ? (
        <CheckCircleIcon className="w-8 text-white" />
      ) : alertType === SNACKBAR_TYPE.ERROR ? (
        <XCircleIcon className="w-8 text-white" />
      ) : (
        <></>
      )}
      <p className="text-base text-white font-bold">{message}</p>
    </Container>
  );
};

export default Snackbar;
