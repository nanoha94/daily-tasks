import styles from "@/styles/form.module.css";

interface Props {
  children: React.ReactNode;
  id?: string;
  label: string;
  memo?: string;
  errorMessage?: string;
}

const FormItem = ({ children, id, label, memo, errorMessage }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.label_container}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        {memo && <p className={styles.memo}>{memo}</p>}
      </div>
      {children}
      {errorMessage && <p className={styles.text_error}>{errorMessage}</p>}
    </div>
  );
};
export default FormItem;
