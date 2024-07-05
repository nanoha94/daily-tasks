import React, { ButtonHTMLAttributes } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AddButton = ({ children, ...props }: Props) => {
  return (
    <button
      type="button"
      {...props}
      className="w-fit flex gap-x-1 items-center text-green text-sm font-bold leading-none hover:text-dark_blue"
    >
      <PlusCircleIcon className="w-[18px] pb-[2px]" strokeWidth={2} />
      {children}
    </button>
  );
};

export default AddButton;
