const getCurrentFileData = require('../storage/data-files-operations.js').getCurrentFileData;
const getCreatedDateEasyFormat = require('../helpers/dateUtils.js').getCreatedDateEasyFormat;
const getNewTableInstance = require('../helpers/printTable.js').getNewTableInstance;
const convertPriorityFromShortFormToFull = require('../helpers/commonFunctions.js').convertPriorityFromShortFormToFull;
const _ = require('underscore');
const Table = require('cli-table2');
const color = require('colors');




function getFilteredTasks(current , options){
	var filteredTasks = [];

	convertPriorityFromShortFormToFull(options);

	_.each(current.tasks , function(task){
		if(_.isMatch(task, options)){
			filteredTasks.push(task);
		}
	});
	return filteredTasks;
}



function printTheTasks(filteredData){
	var rowData,
		table = getNewTableInstance(['id','created','description','category','priority','due']);

	if(filteredData.length===0){
		console.log(color.cyan('No pending tasks found, enjoy your day'));
		return;
	}

	_.each(filteredData, function(task){
		rowData= [];

		rowData.push(task.id ? task.id : "");
		rowData.push(task.created ? getCreatedDateEasyFormat(task.created) : "");
		rowData.push(task.description ? task.description : "");
		rowData.push(task.category ? task.category : "");
		rowData.push(task.priority ? task.priority : "");
		rowData.push(task.due ? task.due : "");

		table.push(rowData);
	})

	console.log(table.toString());
}

module.exports = function listKarm(options){

	getCurrentFileData().then(function(current){
		var filteredData = getFilteredTasks(current , options);
		printTheTasks(filteredData);
	}).catch(function(error){
		//console.log(error.stack);
	});
}