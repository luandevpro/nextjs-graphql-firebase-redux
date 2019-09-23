import { GET_CURRENT_USER } from '../constants/ActionTypes';

export const getCurrentUser = (data) => {
  return {
    type: GET_CURRENT_USER,
    payload: data,
  };
};
