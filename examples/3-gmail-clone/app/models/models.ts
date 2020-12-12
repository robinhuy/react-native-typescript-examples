export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  token?: string;
}

export interface Email {
  id: string;
  sender: string;
  title: string;
  time: string;
  isRead: boolean;
  isStarred: boolean;
  content: string;
}
