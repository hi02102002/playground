export const ERROR_MESSAGE = 'Đã có lỗi xảy ra, vui lòng thử lại sau';

export const PATHS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    VERIFY_EMAIL: '/verify-email',
    RESET_PASSWORD: '/reset-password',
  },
  DASHBOARD: '/dashboard',
  HOME: '/',
  NOT_FOUND: '/404',
  APP: '/app',
} as const;
