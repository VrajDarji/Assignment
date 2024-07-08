export type User = {
  id: number;
  username: string;
  email: string;
  role: "NORMAL_USER" | "ADMIN";
};

export type Blog = {
  id: number;
  title: string;
  description: string;
  userId: number;
  date: string;
};

export type BlogWithUser = {
  id: number;
  title: string;
  description: string;
  date: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: "NORMAL_USER" | "ADMIN";
  };
};
