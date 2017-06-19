const 	chalk = require('chalk'),
		ErrorLog = chalk.bold.red;










module.exports = function reconfigKarm(){	
	console.log(chalk.cyan('Reconfiguring karm settings'));

	readConfigFile().then(function(globalData)){
		readLocalConfigFile().then(function(ocalData)){
			
		}
	}


}