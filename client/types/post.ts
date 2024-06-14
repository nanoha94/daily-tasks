import { POST_CATEGORIES } from "@/costants/posts";
import { Task } from "./task";
import { User } from "./user";

export interface Post {
  id: string;
  comment?: string;
  tasks: Task[];
  category: (typeof POST_CATEGORIES)[number]["key"];
  numOfGood: number;
  author: User;
  createdAt: Date;
}
