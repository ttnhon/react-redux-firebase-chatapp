export const sendMessage = (message) => {
	return (dispatch, getState) => {
		dispatch({ type: 'SEND_MESSAGE', message });
	}
}