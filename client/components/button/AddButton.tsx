import React, { ButtonHTMLAttributes } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  font-size: 18px;
`;

const AddButton = ({ children, ...props }: Props) => {
  return (
    <button
      type="button"
      {...props}
      className="w-fit flex gap-x-1 items-center text-green text-sm font-bold leading-none hover:text-dark_blue"
    >
      <StyledAddCircleOutlineIcon />
      {children}
    </button>
  );
};

export default AddButton;
