import { ERROR_ACCOUNT_EXIST } from '../constants/ActionTypes';

const initialState = 'auth/account-exists-with-different-credential';

const useErrorLogin = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_ACCOUNT_EXIST:
      return action.payload;
    default:
      return state;
  }
};

export default useErrorLogin;
