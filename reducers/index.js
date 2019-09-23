import { combineReducers } from 'redux';
import useCurrentUser from './useCurrentUser';

const reducers = combineReducers({
  currentUser: useCurrentUser,
});

export default reducers;
