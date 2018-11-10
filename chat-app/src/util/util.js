const getLeftTime = (hour) => {
	var res = 0
	if(hour < 1){
		res = Math.round(hour*60);
		if(res <= 1)
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
};

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getMessSentTime(date) {
	var now = new Date();
	var dString = (date.getDate())+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
	var res = addZero(date.getHours())+':'+addZero(date.getMinutes())+':'+addZero(date.getSeconds())+', ';
	if(date.setHours(0,0,0,0) === now.setHours(0,0,0,0)) {
		dString = 'Today';
	}
	return res+dString;
};

export { getLeftTime, getMessSentTime };