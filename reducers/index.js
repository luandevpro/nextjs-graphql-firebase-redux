import { combineReducers } from 'redux';
import useCurrentUser from './useCurrentUser';
import useErrorLogin from './useErrorLogin';

const reducers = combineReducers({
  currentUser: useCurrentUser,
  errorLogin: useErrorLogin,
});

export default reducers;
