/**
 * @flow
 */
import { sbConnect } from '../../sendbirdActions/user';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

export function sendbirdLogin({ userId, nickname }) {
  return (dispatch) => {
    sbConnect(userId, nickname)
      .then((user) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user
        })
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAIL,
          payload: error
        })
      });
  }
}

const INITIAL_STATE = {
  error: '',
  user: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_FAIL:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    default:
      return state;
  }
};