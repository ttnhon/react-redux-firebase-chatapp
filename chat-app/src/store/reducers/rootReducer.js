import authReducer from './authReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
	auth: authReducer,
	message: messageReducer,
	user: userReducer,
	firestore: firestoreReducer
});

export default rootReducer;