import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const FullscreenDrawer = ({ children, isOpen, onClose }: Props) => {
  return (
    <div
      className={`fixed bottom-0 h-screen ${
        isOpen ? "max-h-screen" : "max-h-0"
      } flex flex-col items-start gap-y-5 bg-bg w-full transition-[max-height] overflow-hidden`}
    >
      <div className="w-full p-3">
        <button type="button" onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="max-w-[600px] w-full mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default FullscreenDrawer;
