import styles from "@/styles/form.module.css";

interface Props {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchWindow = ({ value, handleChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="検索"
      defaultValue={value}
      onChange={(e) => {
        handleChange(e);
      }}
      className={`outline-none ${styles.item} ${styles.item_frame}`}
    />
  );
};

export default SearchWindow;
