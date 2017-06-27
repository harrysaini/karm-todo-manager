const getCurrentFileData = require('../storage/data-files-operations.js').getCurrentFileData;
const saveCurrentFile = require('../storage/data-files-operations.js').saveCurrentFile;
const _ = require('underscore');
const Table = require('cli-table2');
const color = require('colors');
const parseOptionsForUpdatingTask = require('../helpers/cmdOptions.js').parseOptionsForUpdatingTask;


function idIsValid(id ,current){
	var isPresent = false;
	_.each(current.tasks, function(task){
		if(task.id===id){
			isPresent = true;
		}
	});

	return isPresent;
}

function getIndexOfTask(id , current){
	var index = -1 , 
		i;

	for(i = 0 ; i<current.tasks.length ; i++){
		if(current.tasks[i].id===id){
			index = i;
			break;
		}
	}

	return index;
}

function updateTask(task , options){
	parseOptionsForUpdatingTask(options);

	console.log(task);
	console.log(options);

	_.each(options, function(val , key){
		task[key] = val;
	});

	console.log(task);
	return task;
}



function modifyTheTask(id , current , options){
	var index = getIndexOfTask(id , current);
	current.tasks[index] = updateTask(current.tasks[index] , options );
	return current;
}

module.exports = function( id , options){
	getCurrentFileData().then(function(current){
		if(idIsValid(id , current)){
			current  =  modifyTheTask(id , current , options);
			saveCurrentFile(current).then(function(){
				console.log(color.green('Task modified sucessfully!!'));
			});
		}else{
			console.log(color.red("Invalid id"));
		}
	}).catch(function(err){
		console.log(err);
		console.log(err.stack);
	});
}