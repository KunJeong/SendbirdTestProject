import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import login from './modules/login';

const reducer = combineReducers({
    login
  });

const store = createStore(
    reducer, 
    // applyMiddleware(logger),
    {},
    compose(applyMiddleware(thunk))
);
export default store;