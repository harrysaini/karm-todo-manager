const getCurrentFileData = require('../storage/data-files-operations.js').getCurrentFileData;
const saveCurrentFile = require('../storage/data-files-operations.js').saveCurrentFile;
const getIndexOfTask = require('../helpers/commonFunctions.js').getIndexOfTask;
const userEnteredValidId  = require('../helpers/commonFunctions.js').userEnteredValidId;
const saveTaskToHistory = require('../storage/data-files-operations.js').saveTaskToHistory;
const color = require('colors');

function deleteTaskFromCurrent(id ,current){
	return new Promise(function(resolve,reject){

		var index = getIndexOfTask(id , current),
			task = current.tasks.splice(index,1);
		saveCurrentFile(current).then(function(){
			resolve(task[0]);
		}).catch(function(err){
			reject(err);
		})	
	})
	
}

module.exports = function doneKarm(id){

	userEnteredValidId(id).then(function(response){
		current = response.data;
		return deleteTaskFromCurrent(id , current);
	}).then(function(task){

		task.completed = (new Date()).toISOString();
		return saveTaskToHistory(task);
		
	}).then(function(){
		console.log(color.green('Task marked as done'));
	}).catch(function(err){
		console.log(color.red(err));
		//console.log(err.stack);
	});

};