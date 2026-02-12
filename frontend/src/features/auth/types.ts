export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  status: boolean;
  message: string;
  user?: User;
  errors?: Record<string, string[]>;
};