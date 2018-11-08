const getLeftTime = (hour) => {
	var res = 0
	if(hour < 1){
		res = Math.round(hour*60);
		if(res === 1)
			return 'left 1 min ago';
		return 'left '+res+' mins ago';
	}
	else if(hour > 23) {
		res = Math.round(hour/24);
		if(res === 1)
			return 'left 1 day ago';
		return 'left '+res+' days ago';
	}
	else {
		res = Math.round(hour);
		if(res === 1)
			return 'left 1 hour ago';
		return 'left '+res+' hours ago';
	}
}
export default getLeftTime;