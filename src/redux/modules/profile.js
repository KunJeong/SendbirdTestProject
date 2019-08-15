import { sbGetCurrentInfo, sbUpdateProfile } from '../../sendbirdActions/user';

const INIT_PROFILE = 'INIT_PROFILE';
const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL';

export const initProfile = () => {
  return { type: INIT_PROFILE }
}

export const getCurrentUserInfo = () => {
  return {
    type: GET_PROFILE_SUCCESS,
    userInfo: sbGetCurrentInfo()
  }
}

export const updateProfile = (nickname) => {
  return (dispatch) => {
    sbUpdateProfile(nickname)
      .then((user) => updateSuccess(dispatch, user))
      .catch((error) => updateFail(dispatch, error))
  }
}

const updateSuccess = (dispatch, user) => {
  dispatch({
    type: UPDATE_PROFILE_SUCCESS,
    userInfo: sbGetCurrentInfo()
  });
}

const updateFail = (dispatch, error) => {
  dispatch({
    type: UPDATE_PROFILE_FAIL,
    error: error
  });
}

const INITIAL_STATE = {
  userInfo: null,
  error: '',
  isSaved: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_PROFILE:
      return { ...state, ...INITIAL_STATE };
    case GET_PROFILE_SUCCESS:
      return { ...state, userInfo: action.userInfo };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, error: '', isSaved: true };
    case UPDATE_PROFILE_FAIL:
      return { ...state, error: action.error, isSaved: false };
    default:
      return state;
  }
};
