import { forwardRef } from "react";
import styles from "@/styles/form.module.css";

interface Props
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  id?: string;
  label: string;
  memo?: string;
  placeholder?: string;
  errorMessage?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ id, label, memo, placeholder, errorMessage, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <div className={styles.label_container}>
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
          {memo && <p className={styles.memo}>{memo}</p>}
        </div>
        <textarea
          className={`${styles.item_border} ${
            !!errorMessage && styles.item_error
          }`}
          id={id}
          rows={4}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        {errorMessage && <p className={styles.text_error}>{errorMessage}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
export default Textarea;
