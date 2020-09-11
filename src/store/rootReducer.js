import { combineReducers } from 'redux';
//imports multiple reducer here
import userReducer from './users/userReducer';

const rootReducer = combineReducers({
    //and use it here
    user: userReducer
})

export default rootReducer;