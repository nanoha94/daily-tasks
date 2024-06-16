export enum POST_MODE {
  CREATE = 0,
  EDIT = 1,
}

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
