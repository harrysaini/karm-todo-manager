const _ = require('underscore');

var availabeOptions = ['priority' , 'category'  , 'due','task'];
var optionsMap = {
	description : 'task'
};


function removeKeyFromObject(obj ,key){
	delete obj[key];
}

function getOptionsFromCommaderObject(options){
	var optionsParsed = {};
	_.each(availabeOptions,function(option){
		if(options.hasOwnProperty(option)){
			optionsParsed[option] = options[option];
		}
	});

	return optionsParsed;
}

function parseOptionsForUpdatingTask(options){
	_.each(optionsMap , function(val , key ){
		if(options.hasOwnProperty(val)){
			options[key] = options[val];
			removeKeyFromObject(options , val);
		}
		
	});
}

module.exports ={
	getOptionsFromCommaderObject:getOptionsFromCommaderObject,
	parseOptionsForUpdatingTask : parseOptionsForUpdatingTask
}