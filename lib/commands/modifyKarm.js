const getCurrentFileData = require('../storage/data-files-operations.js').getCurrentFileData;
const saveCurrentFile = require('../storage/data-files-operations.js').saveCurrentFile;
const parseOptionsForUpdatingTask = require('../helpers/cmdOptions.js').parseOptionsForUpdatingTask;
const getIndexOfTask = require('../helpers/commonFunctions.js').getIndexOfTask;
const userEnteredValidId  = require('../helpers/commonFunctions.js').userEnteredValidId;
const _ = require('underscore');
const Table = require('cli-table2');
const color = require('colors');



function updateTask(task , options){

	parseOptionsForUpdatingTask(options);

	_.each(options, function(val , key){
		task[key] = val;
	});
	
	return task;
}



function modifyTheTask(id , current , options){
	var index = getIndexOfTask(id , current);
	current.tasks[index] = updateTask(current.tasks[index] , options );
	return current;
}

module.exports = function( id , options){
	userEnteredValidId(id).then(function(response){
		current = response.data;
		current  =  modifyTheTask(id , current , options);
		saveCurrentFile(current).then(function(){
			console.log(color.green('Task modified sucessfully!!'));
		});
	}).catch(function(err){
		console.log(color.red(err));
		console.log(err.stack);
	});
}