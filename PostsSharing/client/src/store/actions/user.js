import jwtDecode from 'jwt-decode';
import * as types from '../types';
import * as constants from '../../constants';

export const login = (token) => {
  const decodedToken = jwtDecode(token);
  localStorage.setItem(constants.USER_TOKEN_NAME, token);
  return {
    type: types.LOGIN,
    payload: decodedToken,
  };
};

export const logout = () => {
  localStorage.removeItem(constants.USER_TOKEN_NAME);
  return {
    type: types.LOGOUT,
  };
};
