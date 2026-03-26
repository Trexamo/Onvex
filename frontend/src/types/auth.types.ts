export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'afiliado' | 'cliente' | 'funcionario' | 'entregador';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}
