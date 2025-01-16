/**
 * Interface for the user's information
 */
export interface AuthUserInfo {
  userId: string;
  name: string;
  email: string;
  loggedinAt: string;
}

/**
 * Interface for the snackbar
 */
export interface SnackbarOptions {
  bgColor?: 'SUCCESS' | 'WARNING' | 'ERROR';
}