import { GET_CURRENT_USER } from '../constants/ActionTypes';

const initialState = null;

const useCurrentUser = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
};

export default useCurrentUser;
