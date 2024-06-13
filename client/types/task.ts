export interface Task {
  // todo:nullは暫定対策
  id: string | null;
  content: string;
  completed: boolean;
}
