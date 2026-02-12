import {create} from 'zustand';
import {User} from '../features/auth/types';

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    SetUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    SetUser: (user) => set(() => ({
        user,
        isAuthenticated: !!user,
    }) ),
}))