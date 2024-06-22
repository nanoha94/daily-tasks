import styles from "@/styles/form.module.css";

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchWindow = ({ handleChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="検索"
      onChange={(e) => {
        handleChange(e);
      }}
      className={`${styles.item} ${styles.item_frame} border-none shadow`}
    />
  );
};

export default SearchWindow;
