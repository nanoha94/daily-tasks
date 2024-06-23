import { POST_FILTER_CATEGORIES } from "@/costants/posts";
import styles from "@/styles/form.module.css";
import { useState } from "react";

interface Props {
  selected?: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectCategory = ({ selected, handleChange }: Props) => {
  const [selectedSearchCategory, setSelectedSearchCategory] = useState<string>(
    selected ?? POST_FILTER_CATEGORIES[0].value
  );

  return (
    <div className="flex flex-wrap gap-x-5">
      {POST_FILTER_CATEGORIES.map((category) => (
        <label
          key={category.value}
          className={(styles.label, styles.radiobutton_container)}
        >
          <input
            type="radio"
            name="postCategoryGroup"
            value={category.value}
            checked={category.value === selectedSearchCategory}
            onChange={(e) => {
              setSelectedSearchCategory(e.target.value);
              handleChange(e);
            }}
            className={styles.radiobutton}
          />
          {category.label}
        </label>
      ))}
    </div>
  );
};

export default SelectCategory;
