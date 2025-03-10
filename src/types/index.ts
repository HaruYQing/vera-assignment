export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  isOwnedByLoggedInUser?: boolean;
}

export interface PostWithUser {
  index: number; // Auto-incremented ID
  id: number; // 原始的 post id
  title: string;
  name: string;
  userId: number;
}
