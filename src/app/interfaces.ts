/**
 * Interface for the user's information
 */
export interface AuthUserInfo {
  id: string;
  name: string;
  email: string;
  iat: number;
}

/**
 * Interface for the snackbar
 */
export interface SnackbarOptions {
  bgColor?: 'SUCCESS' | 'WARNING' | 'ERROR';
}