export interface Task {
  // todo:nullは暫定対策
  id: string | undefined;
  content: string;
  completed: boolean;
}
