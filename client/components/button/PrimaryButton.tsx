import { colors } from "@/tailwind.config";
import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "normal" | "cancel" | "destroy";
}

interface ButtonProps {
  $variant: Props["variant"];
}

const TextColor = ($variant: ButtonProps["$variant"]) => {
  if ($variant === "normal" || $variant === "destroy") {
    return colors.white;
  } else if ($variant === "cancel") {
    return colors.black;
  }
};

const HoverTextColor = ($variant: ButtonProps["$variant"]) => {
  if ($variant === "normal") {
    return colors.green;
  } else if ($variant === "cancel") {
    return colors.black;
  } else if ($variant === "destroy") {
    return colors.error;
  }
};

const BgColor = ($variant: ButtonProps["$variant"]) => {
  if ($variant === "normal") {
    return colors.green;
  } else if ($variant === "cancel") {
    return colors.white;
  } else if ($variant === "destroy") {
    return colors.error;
  }
};

const HoverBgColor = ($variant: ButtonProps["$variant"]) => {
  if ($variant === "normal" || $variant === "destroy") {
    return colors.white;
  } else if ($variant === "cancel") {
    return colors.gray["200"];
  }
};

const BorderColor = ($variant: ButtonProps["$variant"]) => {
  if ($variant === "normal" || $variant === "destroy") {
    return colors.transparent;
  } else if ($variant === "cancel") {
    return colors.black;
  }
};

const HoverBorderColor = ($variant: ButtonProps["$variant"]) => {
  if ($variant === "normal") {
    return colors.green;
  } else if ($variant === "cancel") {
    return colors.black;
  } else if ($variant === "destroy") {
    return colors.error;
  }
};

const StyledButton = styled.button<ButtonProps>`
  padding: 12px 20px;
  color: ${({ $variant }) => TextColor($variant)};
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
  background-color: ${({ $variant }) => BgColor($variant)};
  border-width: 2px;
  border-color: ${({ $variant }) => BorderColor($variant)};
  border-radius: 8px;

  &:hover {
    color: ${({ $variant }) => HoverTextColor($variant)};
    background-color: ${({ $variant }) => HoverBgColor($variant)};
    border-color: ${({ $variant }) => HoverBorderColor($variant)};
  }
`;

const PrimaryButton = ({ children, variant = "normal", ...props }: Props) => {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default PrimaryButton;
