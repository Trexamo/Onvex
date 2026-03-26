export type UserRole = 'customer' | 'affiliate' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  created_at: string;
}
