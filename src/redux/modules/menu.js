import { sbDisconnect } from '../../sendbirdActions/user';

const DISCONNECT_SUCCESS = 'DISCONNECT_SUCCESS';
const INIT_MENU = 'INIT_MENU';

export const initMenu = () => {
  return { type: INIT_MENU };
}

export const sendbirdLogout = () => {
  return (dispatch) => {
      sbDisconnect()
      .then(() => dispatch({ type: DISCONNECT_SUCCESS }));
  }
}

const INITIAL_STATE = {
  isDisconnected: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_MENU:
      return { ...state, ...INITIAL_STATE };
    case DISCONNECT_SUCCESS:
      return { ...state, isDisconnected: true };
    default:
      return state;
  }
};