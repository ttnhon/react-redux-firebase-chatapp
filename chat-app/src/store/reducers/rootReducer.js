import authReducer from './authReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	auth: authReducer,
	message: messageReducer,
	user: userReducer
});

export default rootReducer;