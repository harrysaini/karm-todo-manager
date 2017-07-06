const fsp = require('./fs-promises.js');
const path = require('path');
const fileLocations = require('./getInitFileLocations.js');
const color = require('colors');

/**
* @name - isKarmAlreadyInitialised
* @desc - Function to check if karm is not already initialises
*/
function isKarmNotAlreadyInitialised(){
	return new Promise(function(resolve,reject){
		var karmPath = fileLocations.karmDataLocation;

		fsp.fsExists(karmPath).then(function(){
			reject();
		}).catch(function(err){
			resolve(err);
		});
	});
}


function isKarmInitialised(){

	return new Promise(function(resolve,reject){

		var karmPath = fileLocations.karmDataLocation,
		localConfigPath = fileLocations.localConfigLocation;

		fsp.fsExists(karmPath).then(function(){
			
			fsp.fsExists(localConfigPath).then(function(){
				resolve();
			}).catch(function(err){
				console.log(color.red.bold('missing karm local configuration file '));
				reject(err);
			});

		}).catch(function(err){
			console.log(color.red.bold('can\'t find  karm storage directory'));
			reject(err);
		});



	});
}


module.exports = {
	isKarmNotAlreadyInitialised:isKarmNotAlreadyInitialised,
	isKarmInitialised : isKarmInitialised
}