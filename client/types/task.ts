export interface Task {
  // todo:undefinedは暫定対策
  id: string | undefined;
  content: string;
  completed: boolean;
}
