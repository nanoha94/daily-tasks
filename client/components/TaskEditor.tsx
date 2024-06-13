import styles from "@/styles/form.module.css";
import Checkbox from "./form/Checkbox";

const TaskEditor = () => {
  return (
    <div className={styles.container}>
      <div className={styles.label_container}>
        <p className={styles.label}>今日のタスク</p>
        <p className={styles.memo}>各30文字以内で入力してください。</p>
      </div>
      <Checkbox
        id="test"
        label=""
        placeholder="今日のタスクは？"
        isEdit={true}
      />
      <Checkbox
        id="test"
        label=""
        placeholder="今日のタスクは？"
        isEdit={true}
      />
      <Checkbox
        id="test"
        label=""
        placeholder="今日のタスクは？"
        isEdit={true}
      />
      <Checkbox
        id="test"
        label=""
        placeholder="今日のタスクは？"
        isEdit={true}
      />
      <Checkbox
        id="test"
        label=""
        placeholder="今日のタスクは？"
        isEdit={true}
      />
    </div>
  );
};

export default TaskEditor;
