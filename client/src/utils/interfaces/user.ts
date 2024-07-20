export interface CurrentUser {
  id: string;
  token: string;
}

export interface AuthUserFormValues {
  name?: string;
  email: string;
  password: string;
}
