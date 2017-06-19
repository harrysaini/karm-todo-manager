const fsp = require('./fs-promises.js'),
	fileLocations = require('./getInitFileLocations.js');

/*
* @name - isKarmAlreadyInitialised
* @desc - Function to check if karm is not already initialises
*/

function isKarmNotAlreadyInitialised(){
	return new Promise(function(resolve,reject){
		var karmPath = fileLocations.karmDataLocation;

		fsp.fsExists(karmPath).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
}


module.exports = {
	isKarmNotAlreadyInitialised:isKarmNotAlreadyInitialised
}