import React, { ChangeEvent } from "react";
import styles from "@/styles/form.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  placeholder?: string;
  checked?: boolean;
  isEdit?: boolean;
}

const Checkbox = ({
  id,
  label,
  placeholder,
  checked = false,
  isEdit = false,
  ...props
}: Props) => {
  return (
    <div
      className={`flex items-start gap-x-2 ${
        isEdit && "py-1 px-2 rounded border border-gray-600 bg-white "
      }`}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className="w-4 h-auto aspect-square rounded-sm border-gray-600 border-2 text-primary-600 appearance-none relative top-1 "
        {...props}
      />
      {isEdit ? (
        <input
          placeholder={placeholder}
          className="placeholder:text-placeholder"
        />
      ) : (
        <label htmlFor={id} className="flex-1 text-base text-black">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
