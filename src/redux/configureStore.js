import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import login from './modules/login';
import menu from './modules/menu';
import profile from './modules/profile';
import openChannel from './modules/openChannel';
import chat from './modules/chat';

const reducer = combineReducers({
    login,
    menu,
    profile,
    openChannel,
    chat
  });

const store = createStore(
    reducer, 
    // applyMiddleware(logger),
    {},
    compose(applyMiddleware(thunk))
);
export default store;