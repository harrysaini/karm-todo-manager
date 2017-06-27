const Table = require('cli-table2');
const color = require('colors');


function getNewTableInstance(headings){
	var cliTableConfig = {
		chars : {
			'top': '═'
			, 'top-mid': '╤'
			, 'top-left': '╔'
			, 'top-right': '╗'
			, 'bottom': '═'
			, 'bottom-mid': '╧'
			, 'bottom-left': '╚'
			, 'bottom-right': '╝'
			, 'left': '║'
			, 'left-mid': '╟'
			, 'right': '║'
			, 'right-mid': '╢'
		}
	},
	table;
	
	cliTableConfig.head = new Array();

	headings.forEach(function(heading){
		cliTableConfig.head.push(color.cyan(heading));
	});


	table = new Table(cliTableConfig);

	return table;
}


module.exports = {
	getNewTableInstance : getNewTableInstance
}