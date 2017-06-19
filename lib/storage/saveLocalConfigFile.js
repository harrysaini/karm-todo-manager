const fsp = require('./fs-promises.js');
const path = require('path');


module.exports = function saveLocalConfigFile(configData) {
	
	return new Promise(function(resolve,reject){

		var local_configLocation = path.join(__dirname, '../config.local.json'),
		local_configStorageData = JSON.stringify(configData , null , 4);

		fsp.fsWriteFile(local_configLocation,local_configStorageData).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		});
	});
}

