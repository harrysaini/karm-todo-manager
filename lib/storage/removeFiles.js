const fileLocations = require('./getInitFileLocations');
const fsp = require('./fs-promises.js');
const path = require('path');
const color = require('colors');


function removeKarmFolder(){
	return new Promise(function(resolve,reject){
		var directory = fileLocations.karmDataLocation;

		fsp.fsExists(directory).then(function(){
			
			fsp.fseRemove(directory).then(function(){
				console.log(color.green('Deleted karm storage folder'));
				resolve();
			}).catch(function(err){
				reject(err);
			
			});
		}).catch(function(err){
			console.log(color.red('Karm folder already deleted'));
			resolve(err);
		});
		
	});
}


function removeLocalConfigFile(){
	return new Promise(function(resolve,reject){
		var localConfigDirectory =fileLocations.localConfigDirectory;

		fsp.fsExists(localConfigDirectory).then(function(){

			fsp.fseRemove(localConfigDirectory).then(function(){
				resolve();
			}).catch(function(err){
				reject(err);
			});

		}).catch(function(err){
			console.log(color.red('Local config file already deleted'));
			reject(err);
		});
	
	});
}

module.exports = {
	removeKarmFolder:removeKarmFolder,
	removeLocalConfigFile:removeLocalConfigFile
}