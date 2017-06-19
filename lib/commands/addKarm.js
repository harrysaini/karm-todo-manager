const config = require('../storage/data-files-operations.js').config;
const saveCurrentFile = require('../storage/data-files-operations.js').saveCurrentFile;
const getCurrentFileData = require('../storage/data-files-operations.js').getCurrentFileData;
const saveLocalConfigFile = require('../storage/saveLocalConfigFile.js');
const chalk  =require('chalk');
const fileLocations = config.fileLocations;


function validateTaskData(task , options){
	return new Promise(function(resolve,reject){
		resolve();
	});
}


function generateUniqueTaskId(){

	return new Promise(function(resolve,reject){
		var configData = config.configData,
		id = configData.uniqueID;
		configData.uniqueID = configData.uniqueID + 1;
		saveLocalConfigFile(configData).then(function(){
			resolve(id);
		}).catch(function(err){
			reject(err);
		});
	});
	
}

function parseTaskData(desc,options){
	return new Promise(function(resolve,reject){
		var task = {};
		generateUniqueTaskId().then(function(id){
			task.id = id;
			task.description = desc;
			task.priority = options.priority || 'L';
			task.category = options.category || 'General';
			task.due_date = options.dueDate || 'when free';
			resolve(task);
		});
	}).catch(function(err){
		reject(err);
	});
	
}



module.exports = function addKarm(task , options){
	
	getCurrentFileData().then(function(current){

		validateTaskData(task ,options).then(function(){
			parseTaskData(task,options).then(function(taskData){

				//console.log(taskData);
				current.tasks = current.tasks ? current.tasks : new Array();
				//console.log(require('util').inspect(current));
				current.tasks.push(taskData);
				
				saveCurrentFile(current).then(function(){
					console.log(chalk.green('Task added succesfully !!'));
				
				});
			});
		});
	}).catch(function(err){
		console.log(err);
		console.log(chalk.red('Failed to add task'));
	});
}