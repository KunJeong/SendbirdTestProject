import { sbGetOpenChannelList, sbGetOpenChannel, sbOpenChannelExit } from '../../sendbirdActions';

const OPEN_CHANNEL_LIST_SUCCESS = 'OPEN_CHANNEL_LIST_SUCCESS';
const OPEN_CHANNEL_LIST_FAIL = 'OPEN_CHANNEL_LIST_FAIL';

export const getOpenChannelList = (openChannelListQuery) => {
  return (dispatch) => {
    if (openChannelListQuery.hasNext) {
      sbGetOpenChannelList(openChannelListQuery)
        .then((channels) => dispatch({
          type: OPEN_CHANNEL_LIST_SUCCESS,
          list: channels
        }))
        .catch((error) => dispatch({ type: OPEN_CHANNEL_LIST_FAIL }))
    } else {
      dispatch({ type: OPEN_CHANNEL_LIST_FAIL });
    }
  }
}

const INITAL_STATE = {
  list: []
}

export default (state = INITAL_STATE, action) => {
  switch(action.type) {
      case OPEN_CHANNEL_LIST_SUCCESS: 
          return { ...state, list: action.list };
      case OPEN_CHANNEL_LIST_FAIL: 
          return state;
      default:
          return state;
  }
}