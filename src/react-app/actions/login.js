/**
 * Created by trojande on 9/3/17.
 */
import {
    SEND_LOGIN_DATA,
    CHECK_LOGIN_DATA,
} from '../constants';

export function checkLoginData(token: string) {
  return dispatch => Promise.resolve(dispatch({
    type: CHECK_LOGIN_DATA,
    token,
    status: (token === 'abcd' && 'OK') || 'FAIL',
    error: token !== 'abcd' && 'Неправильный логин или пароль',
  }));
}
export function sendLoginData(login: string, password: string) {
  return dispatch => Promise.resolve(dispatch({
    type: SEND_LOGIN_DATA,
    login,
    password,
    response: {
      token: login,
    },
  }));
}
