const fs = require('fs'),
	path = require('path');

var localConfigPath = path.join(__dirname, '../config.local.json');

//here file reading is sync for easyness
var configData = JSON.parse(fs.readFileSync(localConfigPath));

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