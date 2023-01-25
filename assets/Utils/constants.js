const API_URL = 'https://localhost:8000'
export const API_ROUTES = {
    SIGN_UP: `${API_URL}/api/register`,
    SIGN_IN: `${API_URL}/api/login_check`,
    READ_AVAILABLE: `${API_URL}/api/appointment/get/free`,
    CREATE: `${API_URL}/api/appointment`,
}

export const APP_ROUTES = {
    HOME: '/',
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    DASHBOARD: '/dashboard',
}