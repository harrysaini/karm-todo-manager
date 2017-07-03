const getCurrentFileData = require('../storage/data-files-operations.js').getCurrentFileData;
const priorityType = require('../vars.js').priorityType;
const _ = require('underscore');


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


function userEnteredValidId(id){
	return new Promise(function(resolve , reject){
		getCurrentFileData().then(function(current){
			if(idIsValid(id , current)){
				resolve({data:current, idPresent:true});
			}else{
				reject( new Error("invalid id"));
			}
		}).catch(function(err){
			reject(err);
		});
		
	});
}



function convertPriorityFromShortFormToFull(options){
	var priorityAllowed = Object.keys(priorityType);
	if(options.hasOwnProperty('priority')){
		if(priorityAllowed.indexOf(options.priority)!==-1){
			options.priority =  priorityType[options.priority];
		}
	}
}

module.exports = {
	idIsValid : idIsValid,
	getIndexOfTask : getIndexOfTask,
	userEnteredValidId : userEnteredValidId,
	convertPriorityFromShortFormToFull : convertPriorityFromShortFormToFull
};