import { createStore, applyMiddleware } from 'redux';
//import thunkMiddleware to use async function
import thunkMiddleware from 'redux-thunk';
//import rootReducer from store
import rootReducer from './rootReducer';
//import logger to log actions and reducer in console
import logger from 'redux-logger';

const store = createStore(rootReducer, applyMiddleware(logger, thunkMiddleware));
export default store