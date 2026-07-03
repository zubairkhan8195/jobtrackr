export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type AuthResponse = {
  success: true;
  message: string;
  token: string;
  user: AuthUser;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ApiValidationError = {
  field: string;
  message: string;
};

export type ApiErrorResponse = {
  message: string;
  errors?: ApiValidationError[];
};
