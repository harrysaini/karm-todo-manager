const fs = require('fs');
const initFileLocations = require('./getInitFileLocations');

var localConfigPath = initFileLocations.localConfigLocation;

var configData={};

//here file reading is sync for easyness
if(fs.existsSync(localConfigPath)){
	configData = JSON.parse(fs.readFileSync(localConfigPath));
}

var fileLocations = {
	storageLocation : configData.storageLocation,
	historyLocation : configData.historyLocation,
	currentLocation : configData.currentLocation,
	configLocation : configData.configLocation,
	karmDataLocation : configData.karmDataLocation	
};


module.exports ={
	fileLocations : fileLocations,
	configData : configData
}

