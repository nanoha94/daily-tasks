import styles from "@/styles/form.module.css";
import { useState } from "react";

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectCategory = ({ handleChange }: Props) => {
  const searchCategoryItems = [
    { value: "all", label: "すべて" },
    { value: "review", label: "振り返りのみ" },
    { value: "task", label: "タスクのみ" },
  ];

  const [selectedSearchCategory, setSelectedSearchCategory] = useState<string>(
    searchCategoryItems[0].value
  );

  return (
    <div className="flex flex-wrap gap-x-5">
      {searchCategoryItems.map((item) => (
        <label
          key={item.value}
          className={(styles.label, styles.radiobutton_container)}
        >
          <input
            type="radio"
            name="postCategoryGroup"
            value={item.value}
            checked={item.value === selectedSearchCategory}
            onChange={(e) => {
              setSelectedSearchCategory(e.target.value);
              handleChange(e);
            }}
            className={styles.radiobutton}
          />
          {item.label}
        </label>
      ))}
    </div>
  );
};

export default SelectCategory;
