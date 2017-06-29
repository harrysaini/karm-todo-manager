const getHistoryFileData = require('../storage/data-files-operations.js').getHistoryFileData;
const getNewTableInstance = require('../helpers/printTable.js').getNewTableInstance;
const getCreatedDateEasyFormat = require('../helpers/dateUtils.js').getCreatedDateEasyFormat;
const getDateInStandardFormat = require('../helpers/dateUtils.js').getDateInStandardFormat;
const _ = require('underscore');
const color = require('colors');

function printHistoryTasks(tasks){
	var rowData,
		table = getNewTableInstance(['id','completed','description','category','priority','due','created']);

	if(!tasks || tasks.length===0){
		console.log(color.cyan('No tasks found in history, go and completed some soon'));
		return;
	}

	_.each(tasks, function(task){
		rowData= [];

		rowData.push(task.id ? task.id : "");
		rowData.push(task.completed ? getDateInStandardFormat(task.completed) : "");
		rowData.push(task.description ? task.description : "");
		rowData.push(task.category ? task.category : "");
		rowData.push(task.priority ? task.priority : "");
		rowData.push(task.due ? task.due : "");
		rowData.push(task.created ? getDateInStandardFormat(task.created) : "");



		table.push(rowData);
	})

	console.log(table.toString());
}

module.exports = function historyKarm(){
	getHistoryFileData().then(function(history){
		printHistoryTasks(history.tasks);
	}).catch(function(err){
		console.log(err);
		console.log(err.stack);
	})
}