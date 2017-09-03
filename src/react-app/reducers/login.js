/**
 * Created by trojande on 9/3/17.
 */
import { createReducer } from '../helpers';
import {
    SEND_LOGIN_DATA,
    CHECK_LOGIN_DATA,
} from '../constants';

const initialState = {
  token: null,
  error: null,
  hasAccess: false,
};

export default createReducer(initialState, {
  [SEND_LOGIN_DATA]: (state, action) => {
    if (action.status === 'OK') {
      return {
        ...state,
        token: action.response.token,
      };
    } else if (action.status === 'FAIL') {
      return {
        ...state,
        error: action.error,
      };
    }
    return {...state}
  },
  [CHECK_LOGIN_DATA]: (state, action) => {
    if (action.states === 'OK') {
      return {
        ...state,
        hasAccess: true,
      };
    } else if (action.status === 'FAIL') {
      return {
        ...state,
        error: action.error,
      };
    }
    return { ...state };
  },
});
