import { forwardRef } from "react";
import styles from "@/styles/form.module.css";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "type"> {
  id: string;
  type?: string;
  label: string;
  errorMessage?: string;
}

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ id, type = "text", label, errorMessage, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <input
          className={`${styles.item_border} ${
            !!errorMessage && styles.item_error
          }`}
          id={id}
          type={type}
          ref={ref}
          {...props}
        />
        {errorMessage && <p className={styles.text_error}>{errorMessage}</p>}
      </div>
    );
  }
);
TextInput.displayName = "TextInput";
export default TextInput;
