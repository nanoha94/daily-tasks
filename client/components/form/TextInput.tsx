import { error } from "console";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "id"> {
  id: string;
  label: string;
  errorMessage?: string;
}

const TextInput = ({ id, label, errorMessage, ...props }: Props) => {
  return (
    <div>
      <label className="block text-black text-base mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight placeholder:text-placeholder focus:outline-none focus:shadow-outline"
        type="text"
        id={id}
        {...props}
      />
      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
