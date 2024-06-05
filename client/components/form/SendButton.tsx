import React from "react";

interface Props {
  children: React.ReactNode;
}

const SendButton = ({ children }: Props) => {
  return (
    <button className="text-white font-bold bg-dark_blue rounded-lg p-3">
      {children}
    </button>
  );
};

export default SendButton;
