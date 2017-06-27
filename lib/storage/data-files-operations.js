const config = require('../storage/getConfigOptions.js');
const fileLocations = config.fileLocations;
const fsp = require('./fs-promises.js');

function saveCurrentFile(current){
	
	return new Promise(function(resolve,reject){

		var location = fileLocations.currentLocation;

		current = JSON.stringify(current,null,4);

		fsp.fsWriteFile(location,current).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		})
	});
}


function getCurrentFileData(){

	return new Promise(function(resolve,reject){

		var location = fileLocations.currentLocation;
		fsp.fsReadFile(location).then(function(data){
			resolve(JSON.parse(data));
		}).catch(function(err){
			reject(err);
		});
		
	});
	
}


function getHistoryFileData(){
	return new Promise(function(resolve,reject){

		var location = fileLocations.historyLocation;
		fsp.fsReadFile(location).then(function(data){
			resolve(JSON.parse(data));
		}).catch(function(err){
			reject(err);
		});
	})
}

function saveHistoryFile(history){
	return new Promise(function(resolve,reject){

		var location = fileLocations.historyLocation;

		history = JSON.stringify(history,null,4);

		fsp.fsWriteFile(location , history).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		})
	});
}


function saveTaskToHistory(task){
	return new Promise(function(resolve,reject){

		getHistoryFileData().then(function(history){
			history.tasks = history.tasks || new Array();
			history.tasks.push(task);
			return saveHistoryFile(history);
		}).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		})
	})
}


module.exports = {
	config : config , 
	saveCurrentFile : saveCurrentFile,
	getCurrentFileData : getCurrentFileData,
	saveTaskToHistory : saveTaskToHistory,
	getHistoryFileData :getHistoryFileData
}