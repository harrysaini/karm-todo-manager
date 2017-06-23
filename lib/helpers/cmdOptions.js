const _ = require('underscore');

var availabeOptions = ['priority' , 'category'  , 'due'];

function getOptionsFromCommaderObject(options){
	var optionsParsed = {};
	_.each(availabeOptions,function(option){
		if(options.hasOwnProperty(option)){
			optionsParsed[option] = options[option];
		}
	});

	return optionsParsed;
}

module.exports ={
	getOptionsFromCommaderObject:getOptionsFromCommaderObject
}