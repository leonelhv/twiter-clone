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
  updatedAt: string;
  __v: number;
  liked?: boolean;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  lastname: string;
  photo: string;
}