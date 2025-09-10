export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: number;
}

export interface PublicUser {
  id: string;
  username: string;
  email: string;
  createdAt: number;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
