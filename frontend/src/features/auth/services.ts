import { api } from '@/lib/api';
import { getCsrfCookie } from '@/lib/csrfHelper';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from './types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await getCsrfCookie();
    const response = await api.post<AuthResponse>('/api/login', credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    await getCsrfCookie();
    const response = await api.post<AuthResponse>('/api/register', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/api/logout');
  },

  async getUser(): Promise<AuthResponse> {
    const response = await api.get<AuthResponse>('/api/user');
    return response.data;
  },
};