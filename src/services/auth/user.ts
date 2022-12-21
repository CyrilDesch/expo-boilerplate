export interface UserBase {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

export interface UserRaw {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

export interface LoginForm {
  email: string;
}
