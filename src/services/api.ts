import { Post, User, Comment } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com";

// 抓所有貼文
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

// 抓所有使用者
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

// 抓特定貼文
export const fetchPost = async (id: number): Promise<Post> => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post ${id}`);
  }
  return response.json();
};

// 抓特定使用者
export const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user ${id}`);
  }
  return response.json();
};

// 抓貼文的評論
export const fetchComments = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error(`Failed to fetch comments for post ${postId}`);
  }
  return response.json();
};

// 刪除評論
export const deleteComment = async (commentId: number): Promise<boolean> => {
  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    method: "DELETE",
  });
  return response.ok;
};
