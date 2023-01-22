const API_URL = 'https://localhost:8000'
export const API_ROUTES = {
    SIGN_UP: `${API_URL}/api/register`,
    SIGN_IN: `${API_URL}/api/login_check`,
    READ: `${API_URL}/api/appointment/read`,
}

export const APP_ROUTES = {
    HOME: '/',
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    DASHBOARD: '/dashboard',
}