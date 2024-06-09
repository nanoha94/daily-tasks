import React, { ChangeEvent } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  checked: boolean;
}

const Checkbox = ({ id, label, checked, ...props }: Props) => {
  return (
    <div className="flex items-start gap-x-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        className="w-4 h-auto aspect-square rounded-sm border-gray-600 border-2 text-primary-600 appearance-none relative top-0.5 "
        {...props}
      />
      <label htmlFor={id} className="flex-1 text-sm font-medium text-black">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
