import { colors } from "@/tailwind.config";
import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  children: React.ReactNode;
  variant?: "normal" | "cancel" | "destroy";
  disabled?: boolean;
}

interface ButtonProps {
  $variant: Props["variant"];
  disabled: Props["disabled"];
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

const BgColor = (
  $variant: ButtonProps["$variant"],
  disabled: ButtonProps["disabled"]
) => {
  if (disabled) {
    return colors.gray["400"];
  } else {
    if ($variant === "normal") {
      return colors.green;
    } else if ($variant === "cancel") {
      return colors.white;
    } else if ($variant === "destroy") {
      return colors.error;
    }
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

const PointerEvents = (disabled: ButtonProps["disabled"]) => {
  if (disabled) {
    return "none";
  } else {
    return "auto";
  }
};

const StyledButton = styled.button<ButtonProps>`
  padding: 12px 20px;
  color: ${({ $variant }) => TextColor($variant)};
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
  background-color: ${({ $variant, disabled }) => BgColor($variant, disabled)};
  border-width: 2px;
  border-color: ${({ $variant }) => BorderColor($variant)};
  border-radius: 8px;
  pointer-events: ${({ disabled }) => PointerEvents(disabled)};

  &:hover {
    color: ${({ $variant }) => HoverTextColor($variant)};
    background-color: ${({ $variant }) => HoverBgColor($variant)};
    border-color: ${({ $variant }) => HoverBorderColor($variant)};
  }
`;

const PrimaryButton = ({
  children,
  variant = "normal",
  disabled = false,
  ...props
}: Props) => {
  return (
    <StyledButton $variant={variant} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};

export default PrimaryButton;
