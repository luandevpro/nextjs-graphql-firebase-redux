import { ERROR_ACCOUNT_EXIST } from '../constants/ActionTypes';

const initialState =
  'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.'; // eslint-disable-line

const useErrorLogin = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_ACCOUNT_EXIST:
      return action.payload;
    default:
      return state;
  }
};

export default useErrorLogin;
