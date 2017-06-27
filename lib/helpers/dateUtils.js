
function getCreatedDateEasyFormat(date){
	var nowTimeStamp = Math.abs(new Date()),
		createdTimeStamp = Math.abs(new Date(date)),
		difference = nowTimeStamp - createdTimeStamp;
	if(difference < 3600000){
		return ( Math.floor(difference/60000) + " min ago");
	}else if(difference < (3600000*24)){
		return ( Math.floor(difference/(60*60000)) + " hours ago");
	}else{
		return (( Math.floor(difference/(24*60*60000)) + " hours ago"));
	}
}


module.exports = {
	getCreatedDateEasyFormat : getCreatedDateEasyFormat
}