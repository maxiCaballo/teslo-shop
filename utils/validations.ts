import { ROLE_CONSTANTS } from '@/database/constants';

export const isValidEmail = (email: string): boolean => {
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return !!match;
};

export const isEmail = (email: string): string | undefined => {
  return isValidEmail(email) ? undefined : 'Invalid email';
};

export const validateUser = (
  email: string,
  name: string,
  password: string
): { isValidUser: boolean; errorMessage: string } => {
  const validUser = {
    isValidUser: true,
    errorMessage: ''
  };

  if (password.length < 6) {
    validUser.errorMessage = 'Password have must be least 6 characters...';
    validUser.isValidUser = false;
    return validUser;
  }

  if (name.length < 2) {
    validUser.errorMessage = 'Name have must be least 2 characters...';
    validUser.isValidUser = false;
    return validUser;
  }

  if (!isValidEmail(email)) {
    validUser.errorMessage = 'Invalid email';
    validUser.isValidUser = false;
    return validUser;
  }

  return validUser;
};

export const isAdminRole = (role: string) => {
  return ROLE_CONSTANTS.adminRoles.includes(role);
};
