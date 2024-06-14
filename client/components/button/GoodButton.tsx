"use client";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
  isClicked: boolean;
}

const StyledThumbUpIcon = styled(ThumbUpIcon)`
  font-size: 16px !important;
`;

const GoodButton = ({ count, isClicked, ...props }: Props) => {
  return (
    <button
      type="button"
      className={`flex items-center gap-x-1 border-2  rounded-full py-0.5 px-2 transition-colors  hover:opacity-70  ${
        isClicked
          ? "text-white border-transparent bg-green"
          : "text-gray-600 border-gray-600 bg-white "
      } `}
      {...props}
    >
      <StyledThumbUpIcon />
      {count > 0 && (
        <span className="text-xs leading-none font-bold">{count}</span>
      )}
    </button>
  );
};

export default GoodButton;
