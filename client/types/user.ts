import { Post } from "./post";
import { Profile } from "./profile";

export interface User {
  id: string | undefined;
  name: string;
  posts: Post[];
  profile?: Profile;
}

export const DefaultUser = {
  id: undefined,
  name: "",
  posts: [],
};
