export type Payload = {
  username?: string;
  password?: string;
};

export type AuthError = Payload;

export interface AuthState {
  isAuthenticated: boolean;
  username: string | undefined;
  error?: AuthError | undefined;
}

export interface AuthAction {
  type: string;
  payload: Payload;
}

export interface CreateContext {
  authState: AuthState;
  login: (username: string, password: string) => void;
  logout: () => void;
}
