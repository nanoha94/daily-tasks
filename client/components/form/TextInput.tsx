import { forwardRef } from "react";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  errorMessage?: string;
}

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ id, label, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-y-2">
        <label className="block text-black text-base" htmlFor={id}>
          {label}
        </label>
        <input
          className={`appearance-none border rounded w-full py-2 px-3 text-black leading-tight placeholder:text-placeholder focus:outline-none focus:shadow-outline ${
            !!errorMessage && "border-2 border-error"
          }`}
          type="text"
          id={id}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <p className=" text-error text-xs font-bold">{errorMessage}</p>
        )}
      </div>
    );
  }
);
TextInput.displayName = "TextInput";
export default TextInput;
