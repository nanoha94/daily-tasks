import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

const StyledChevronRightIcon = styled(ChevronRightIcon)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 14px;
`;

const ArrowButton = ({ children, ...props }: Props) => {
  return (
    <button
      type="button"
      className="relative w-full text-green text-xs font-bold text-center border-2 border-green rounded pl-2 pr-5 pt-0.5 pb-px transition-colors hover:text-white hover:border-transparent hover:bg-green"
      {...props}
    >
      {children}
      <StyledChevronRightIcon strokeWidth={3} />
    </button>
  );
};

export default ArrowButton;
