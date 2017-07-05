
function getCreatedDateEasyFormat(date){
	var nowTimeStamp = Math.abs(new Date()),
		createdTimeStamp = Math.abs(new Date(date)),
		difference = nowTimeStamp - createdTimeStamp;
	if(difference < 3600000){
		return ( Math.floor(difference/60000) + " min ago");
	}else if(difference < (3600000*24)){
		return ( Math.floor(difference/(60*60000)) + " hours ago");
	}else{
		return (( Math.floor(difference/(24*60*60000)) + " days ago"));
	}
}


function getDateInNormalFormat(date){
	var completed = new Date(date);
	return completed.toDateString().substring(4);
}

function getDateInStandardFormat(date){
	return date.substring(0,10);
}

module.exports = {
	getCreatedDateEasyFormat : getCreatedDateEasyFormat,
	getDateInNormalFormat : getDateInNormalFormat,
	getDateInStandardFormat : getDateInStandardFormat
}