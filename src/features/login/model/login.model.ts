export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const LoginStatus = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
} as const;

export type LoginStatus = typeof LoginStatus[keyof typeof LoginStatus];

export const DEFAULT_CREDENTIALS: LoginCredentials = {
  email: '',
  password: ''
};
