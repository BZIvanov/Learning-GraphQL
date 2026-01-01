import * as types from '../types';
import jwtDecode from 'jwt-decode';
import * as constants from '../../constants';

const initialState = {
  user: null,
};

const localUserToken = localStorage.getItem(constants.USER_TOKEN_NAME);
if (localUserToken) {
  const decodedToken = jwtDecode(localUserToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(constants.USER_TOKEN_NAME);
  } else {
    initialState.user = decodedToken;
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case types.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
