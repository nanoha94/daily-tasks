import React, { ButtonHTMLAttributes } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AddButton = ({ children, ...props }: Props) => {
  return (
    <button
      type="button"
      {...props}
      className="w-fit flex gap-x-1 items-center text-green text-xs font-bold hover:text-dark_blue"
    >
      <AddCircleOutlineIcon className="text-[18px]" />
      {children}
    </button>
  );
};

export default AddButton;
