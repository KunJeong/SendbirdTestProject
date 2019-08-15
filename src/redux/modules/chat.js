const INIT_CHAT_SCREEN = 'INIT_CHAT_SCREEN';
const CREATE_CHAT_HANDLER_SUCCESS = 'CREATE_CHAT_HANDLER_SUCCESS';
const CREATE_CHAT_HANDLER_FAIL = 'CREATE_CHAT_HANDLER_FAIL';
const MESSAGE_LIST_SUCCESS = 'MESSAGE_LIST_SUCCESS';
const MESSAGE_LIST_FAIL = 'MESSAGE_LIST_FAIL';
const SEND_MESSAGE_TEMPORARY = 'SEND_MESSAGE_TEMPORARY';
const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';
const CHANNEL_EXIT_SUCCESS = 'CHANNEL_EXIT_SUCCESS';
const CHANNEL_EXIT_FAIL = 'CHANNEL_EXIT_FAIL';
const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
const MESSAGE_UPDATED = 'MESSAGE_UPDATED';
const MESSAGE_DELETED = 'MESSAGE_DELETED';

import {
  sbGetOpenChannel,
  sbOpenChannelEnter,
  sbGetMessageList,
  sbSendTextMessage,
  sbOpenChannelExit
} from '../../sendbirdActions';
import SendBird from 'sendbird';

export const initChatScreen = () => {
  const sb = SendBird.getInstance();
  sb.removeAllChannelHandlers();
  return { type: INIT_CHAT_SCREEN }
}

export const createChatHandler = (channelUrl) => {
  return (dispatch) => {
    sbGetOpenChannel(channelUrl)
      .then((channel) => {
        sbOpenChannelEnter(channel)
          .then((channel) => {
            registerHandler(channelUrl, dispatch);
            dispatch({ type: CREATE_CHAT_HANDLER_SUCCESS });
          })
          .catch((error) => dispatch({ type: CREATE_CHAT_HANDLER_FAIL }));
      })
      .catch((error) => dispatch({ type: CREATE_CHAT_HANDLER_FAIL }));
  }
}

const registerHandler = (channelUrl, dispatch) => {
  const sb = SendBird.getInstance();
  let channelHandler = new sb.ChannelHandler();

  channelHandler.onMessageReceived = (channel, message) => {
    if (channel.url === channelUrl) {
      dispatch({
        type: MESSAGE_RECEIVED,
        payload: message
      })
    }
  }
  channelHandler.onMessageUpdated = (channel, message) => {
    if (channel.url === channelUrl) {
      dispatch({
        type: MESSAGE_UPDATED,
        payload: message
      })
    }
  }
  channelHandler.onMessageDeleted = (channel, messageId) => {
    if (channel.url === channelUrl) {
      dispatch({
        type: MESSAGE_DELETED,
        payload: messageId
      })
    }
  }

  sb.addChannelHandler(channelUrl, channelHandler);
}

export const getPrevMessageList = (previousMessageListQuery) => {
  return (dispatch) => {
    if (previousMessageListQuery.hasMore) {
      sbGetMessageList(previousMessageListQuery)
        .then((messages) => {
          dispatch({
            type: MESSAGE_LIST_SUCCESS,
            list: messages
          });
        })
        .catch((error) => dispatch({ type: MESSAGE_LIST_FAIL }))
    } else {
      dispatch({ type: MESSAGE_LIST_FAIL });
    }
  }
}

export const onSendButtonPress = (channelUrl, textMessage) => {
  return (dispatch) => {
    sbGetOpenChannel(channelUrl)
      .then((channel) => {
        sendTextMessage(dispatch, channel, textMessage);
      })
      .catch((error) => dispatch({ type: SEND_MESSAGE_FAIL }))
  }
}

const sendTextMessage = (dispatch, channel, textMessage) => {
  const messageTemp = sbSendTextMessage(channel, textMessage, (message, error) => {
    if (error) {
      dispatch({ type: SEND_MESSAGE_FAIL });
    } else {
      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        message: message
      });
    }
  });
  dispatch({
    type: SEND_MESSAGE_TEMPORARY,
    message: messageTemp
  });
}

export const channelExit = (channelUrl) => {
  return (dispatch) => {
    sbGetOpenChannel(channelUrl)
      .then((channel) => {
        sbOpenChannelExit(channel)
          .then((response) => dispatch({ type: CHANNEL_EXIT_SUCCESS }))
          .catch((error) => dispatch({ type: CHANNEL_EXIT_FAIL }))
      })
      .catch((error) => dispatch({ type: CHANNEL_EXIT_FAIL }))
  }
}

const INITAL_STATE = {
  list: [],
  exit: false
}

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case INIT_CHAT_SCREEN:
      return { ...state, ...INITAL_STATE };
    case CREATE_CHAT_HANDLER_SUCCESS:
      return { ...state }
    case CREATE_CHAT_HANDLER_FAIL:
      return { ...state }
    case MESSAGE_LIST_SUCCESS:
      return { ...state, list: [...state.list, ...action.list] };
    case MESSAGE_LIST_FAIL:
      return { ...state };
    case SEND_MESSAGE_TEMPORARY:
      return { ...state, list: [...[action.message], ...state.list] }
    case SEND_MESSAGE_SUCCESS:
      const newMessage = action.message;
      const sendSuccessList = state.list.map((message) => {
        if (message.reqId.toString() === newMessage.reqId.toString()) {
          return newMessage;
        } else {
          return message;
        }
      })
      return { ...state, list: sendSuccessList }
    case SEND_MESSAGE_FAIL:
      const newChatList = state.list.slice(1);
      return { ...state, list: newChatList }
    case CHANNEL_EXIT_SUCCESS:
      return { ...state, exit: true };
    case CHANNEL_EXIT_FAIL:
      return { ...state, exit: false };
    case MESSAGE_RECEIVED:
      return { ...state, list: [...[action.payload], ...state.list] }
    case MESSAGE_UPDATED:
      const updatedMessage = action.payload;
      const updatedList = state.list.map((message) => {
        if (message.messageId === updatedMessage.messageId) {
          message = updatedMessage
        }
        return message
      });
      return { ...state, list: updatedList }
    case MESSAGE_DELETED:
      const deletedList = state.list.filter((message) => {
        return message.messageId.toString() !== action.payload.toString();
      });
      return { ...state, list: deletedList }
    default:
      return state;
  }
}