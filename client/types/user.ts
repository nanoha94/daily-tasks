import { Post } from "./post";
import { Profile } from "./profile";

export interface User {
  id: string;
  name: string;
  posts: Post[] | null;
  profile: Profile | null;
}
