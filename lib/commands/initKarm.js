const chalk = require('chalk'),
figlet = require('figlet'),
clear = require('clear'),
readConsoleInput = require('../helpers/readConsoleInput.js'),
ErrorLog = chalk.bold.red ,
initAllFiles  = require('../storage/initLocalFiles.js').initAllFiles;


/*
*Function to display into message
*/
function intro(){
	clear();
	console.log(
		chalk.blue(
			figlet.textSync('Karm', { horizontalLayout: 'full' })
			)
		);

	console.log(
		chalk.green('A simple command line todo manager ')
		);
}


/*
*Function to print welcome message
*/
function printWecomeMessage(){
	console.log(
		chalk.green('Start managing your tasks bettter  with karm ')
		);
	console.log(
		chalk.green('Use karm --help for help')
		);
	console.log(
		chalk.green('Mange your tasks better!!!!')
		);
	console.log();
}

/*
*Function to get storage permisions
*/
function getStoragePermissions(){

	return new Promise(function(resolve , reject){
		var question = 'Karm need to store local files , is it ok with you ? (yes) or (no) -> ';
		readConsoleInput.getUserResponse(question , function(answer){
			if(answer==='yes'){
				resolve();
			}else{
				reject();
			}	
		});

	});
	

}

module.exports = function(){
	
	//call intro function
	intro();

	
	getStoragePermissions().then(function(){
		printWecomeMessage();

		initAllFiles().then(function(){

			console.log(chalk.green("You are ready to use karm."));
			console.log(chalk.blue(' Go manage your tasks!!'));

		}).catch(function(err){
			console.log(err);
			console.log(err.stack);
			console.log(ErrorLog("Failed to init storage files"));
			process.exit(1);
		})
		

	}).catch(function(err){
		console.log(ErrorLog('Permission denied'));
		process.exit(1);
	});


}