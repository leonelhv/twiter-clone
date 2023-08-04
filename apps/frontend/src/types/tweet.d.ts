import { User } from "./user";

export interface Itweet {
  _id: string;
  content: string;
  userId: User;
  likes: number;
  liked: boolean;
  retweets: number;
  countComments: number;
  tweetFather: string | null;
  createdAt: string;
  liked?: boolean;
}

