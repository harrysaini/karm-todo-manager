const fileLocations = require('./getInitFileLocations'),
	fsp = require('./fs-promises.js'),
	color = require('colors'),
	path = require('path'),
	ErrorLog = color.bold.red,
	util = require('util');


function _initStorageDirectory(){

	return new Promise(function(resolve,reject){
		var main_directory = fileLocations.karmDataLocation,
			data_directory = fileLocations.storageLocation,
			localConfigDirectory = fileLocations.localConfigDirectory;

		fsp.fsMakeDirectory(main_directory).then(function(){
			return fsp.fsMakeDirectory(data_directory);
		}).then(function(){
			return fsp.fsMakeDirectory(localConfigDirectory);
		}).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
}

function _initLocalConfigFile(){

	//console.log('initloaclConfig');

	return new Promise(function(resolve,reject){

		var initLocalConfigData = {
			description : "Karm internal configuration file (please don't modify) ",
			storageLocation : fileLocations.storageLocation,
			historyLocation : fileLocations.historyLocation,
			currentLocation : fileLocations.currentLocation,
			configLocation : fileLocations.configLocation,
			karmDataLocation : fileLocations.karmDataLocation,
			uniqueID : 1
		},
		local_configLocation = fileLocations.localConfigLocation,
		local_configStorageData = JSON.stringify(initLocalConfigData , null , 4);

		fsp.fsWriteFile(local_configLocation,local_configStorageData).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
	
}


function _initConfigFile(){

	//console.log('initConfig');

	return new Promise(function(resolve,reject){
		var initConfigData = {
			description : "Karm configuration file ",
			storageLocation :fileLocations.storageLocation
		},
		configLocation = fileLocations.configLocation,
		configStorageData = JSON.stringify(initConfigData ,null ,4);

		fsp.fsWriteFile(configLocation,configStorageData).then(function(){
			console.log(
				color.cyan('Initialised config file at -> '+configLocation)
				);

			resolve();
		}).catch(function(err){
			reject(err);
		});
	});

}

function _initHistoryFile(){

	//console.log('initHistory');


	return new Promise(function(resolve,reject){

		var	historyLocation = fileLocations.historyLocation,
			historyData = JSON.stringify({} , null , 4);

		fsp.fsWriteFile(historyLocation,historyData).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
}


function _initCurrentDataFile(){

	//console.log('initCurrent');


	return new Promise(function(resolve,reject){

		var	currentLocation = fileLocations.currentLocation,
			currentData = JSON.stringify({} , null ,4);

		fsp.fsWriteFile(currentLocation,currentData).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
}


function initAllFiles(){

	return new Promise(function(resolve,reject){
		_initStorageDirectory().then(function(){
			return _initLocalConfigFile();
		}).then(function(){
			 return _initConfigFile();
		}).then(function(){
			return _initHistoryFile();
		}).then(function(){
			return _initCurrentDataFile();
		}).then(function(){
			console.log(color.cyan("Initialised all storage files at -> "+fileLocations.storageLocation));
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
}

module.exports = {
	initAllFiles :initAllFiles
}