export type UserRole = "user" | "admin";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}
