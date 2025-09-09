export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
