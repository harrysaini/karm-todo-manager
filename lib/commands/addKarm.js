const config = require('../storage/data-files-operations.js').config;
const saveCurrentFile = require('../storage/data-files-operations.js').saveCurrentFile;
const getCurrentFileData = require('../storage/data-files-operations.js').getCurrentFileData;
const saveLocalConfigFile = require('../storage/saveLocalConfigFile.js');
const fileLocations = config.fileLocations;
const priorityType = require('../vars.js').priorityType;
const color  =require('colors');
const _ = require("underscore");



function validatePriority(options){
	var priorityAllowed  = Object.keys(priorityType);
	if(_.contains(priorityAllowed , options.priority)){
		return true;
	}else{
		return false;
	}
}


function checkPriority(options){

	var priorityAllowed  = Object.keys(priorityType);

	return new Promise(function(resolve,reject){

		if(options.hasOwnProperty('priority')){

			if(validatePriority(options)){
				options.priority = priorityType[options.priority];
				resolve();
			}else{
				console.log(color.bold.red("Invalid priority value,\npermitted values are -> "+priorityAllowed));
				reject();
			}
		}else{
			resolve();
		}
	});
	
}


function validateTaskData(task , options){
	return new Promise(function(resolve,reject){
		checkPriority(options).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		})
		
	});
}


function generateUniqueTaskId(){

	return new Promise(function(resolve,reject){
		var configData = config.configData,
		id = configData.uniqueID;
		configData.uniqueID = configData.uniqueID + 1;
		saveLocalConfigFile(configData).then(function(){
			resolve('k'+id);
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
			task.priority = options.priority || 'Low';
			task.category = options.category || 'General';
			task.due = options.due || 'when free';
			task.created = (new Date()).toISOString();
			resolve(task);
		});
	}).catch(function(err){
		reject(err);
	});
	
}



module.exports = function addKarm(task , options){

	getCurrentFileData().then(function(current){

		validateTaskData(task ,options).then(function(){

			return parseTaskData(task,options);

		}).then(function(taskData){

			current.tasks = current.tasks ? current.tasks : new Array();
			current.tasks.push(taskData);
			
			return saveCurrentFile(current);

		}).then(function(){

			console.log(color.green('Task added succesfully !!'));

		}).catch(function(err){
			//console.log(err);
			console.log(color.red('Failed to add task'));
		});
		
	}).catch(function(err){
		//console.log(err);
		console.log(color.red('Failed to add task'));
	});
}