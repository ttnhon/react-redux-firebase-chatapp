const initState = {
	users: [
		{displayName: 'abcd', email: 'Olia', uid: '1234', isOnline: false}
	]
};

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_USER':
			console.log('add user', action.user);
			return state;
		case 'ADD_USER_ERROR':
			console.log('add user', action.err);
			return state;
		default:
			return state;
	}
};

export default userReducer;