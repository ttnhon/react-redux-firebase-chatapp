export const addUser = (user) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('users').add({
			...user,
		}).then(() => {
			dispatch({ type: 'ADD_USER', user });
		}).catch((err) => {
			dispatch({ type: 'ADD_USER_ERROR', err });
		})
	}
}