export const ROUTE_CONFIG = {
    auth: [
        '/login',
        '/register',
    ],

    protected: [
        '/dashboard',
        '/profile',
    ]
}as const;

export const DEFAULT_REDIRECT = {
    afterLogin: '/dashboard',
    afterLogout: '/',
    unauthorized: '/login'
} as const;

