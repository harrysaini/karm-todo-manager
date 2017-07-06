const fsp = require('./fs-promises.js');
const fileLocations = require('./getInitFileLocations');


module.exports = function saveLocalConfigFile(configData) {
	
	return new Promise(function(resolve,reject){

		var local_configLocation = fileLocations.localConfigLocation,
		local_configStorageData = JSON.stringify(configData , null , 4);

		fsp.fsWriteFile(local_configLocation,local_configStorageData).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
}

