export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
  token?: string;
}

export interface Email {
  id: number;
  sender: string;
  title: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  content: string;
}
