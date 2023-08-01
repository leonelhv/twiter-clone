export interface Itweet {
  _id: string;
  content: string;
  userId: User;
  likes: number;
  retweets: number;
  countComments: number;
  tweetFather: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface User {
  _id: string;
  username: string;
  name: string;
  lastname: string;
  photo: string;
}