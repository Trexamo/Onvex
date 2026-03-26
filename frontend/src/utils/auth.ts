export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('@logzz:token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('@logzz:token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('@logzz:token');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
