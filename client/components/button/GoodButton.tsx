"use client";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
}

// TODO: いいね済みかを受け取って表示切替する
const GoodButton = ({ count, ...props }: Props) => {
  return (
    <button
      type="button"
      className="flex items-center gap-x-2 text-white bg-green border-2 border-transparent rounded-full py-1 px-2 transition-colors hover:bg-white hover:text-green hover:border-green"
      {...props}
    >
      <ThumbUpIcon className="text-sm" />
      {count > 0 && <span className="text-sm  font-bold">{count}</span>}
    </button>
  );
};

export default GoodButton;
