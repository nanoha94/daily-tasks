export enum POST_CATEGORY {
  TASK = 0,
  REVIEW = 1,
}

export const POST_CATEGORIES = [
  {
    id: POST_CATEGORY.TASK,
    key: "task",
    label: "本日のタスク",
  },
  {
    id: POST_CATEGORY.REVIEW,
    key: "review",
    label: "本日の振り返り",
  },
];

export const POST_FILTER_CATEGORIES = [
  { value: "all", label: "すべて" },
  { value: "review", label: "振り返りのみ" },
  { value: "task", label: "タスクのみ" },
];

export const POST_ORDERS = [
  { id: 0, value: "sortByNew", label: "新しい順" },
  { id: 1, value: "sortByOld", label: "古い順" },
];
