const 	color = require('colors'),
		figlet = require('figlet'),
		clear = require('clear'),
		readConsoleInput = require('../helpers/readConsoleInput.js'),
		ErrorLog = color.bold.red ,
		initAllFiles  = require('../storage/initLocalFiles.js').initAllFiles,
		isKarmNotAlreadyInitialised = require('../storage/isAlreadyInitialised.js').isKarmNotAlreadyInitialised;


/*
*Function to display into message
*/
function intro(){
	clear();
	console.log(
		color.blue(
			figlet.textSync('Karm', { horizontalLayout: 'full' })
			)
		);

	console.log(
		color.green('A simple command line todo manager ')
		);
}


/*
*Function to print welcome message
*/
function printWecomeMessage(){
	console.log(
		color.green('Start managing your tasks bettter  with karm ')
		);
	console.log(
		color.green('Use karm --help for help')
		);
	console.log(
		color.green('Mange your tasks better!!!!')
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




module.exports = function initKarm(){
	
	//call intro function
	intro();

	
	isKarmNotAlreadyInitialised().then(function(){
		
		
		getStoragePermissions().then(function(){

			printWecomeMessage();
			
			initAllFiles().then(function(){

				console.log(color.green("You are ready to use karm."));
				console.log(color.blue(' Go manage your tasks!!'));

			}).catch(function(err){
				console.log(err);
				console.log(err.stack);
				console.log(ErrorLog("Failed to init storage files"));
				process.exit(1);
			});

		}).catch(function(err){
			console.log(ErrorLog('Permission denied'));
			process.exit(1);
		})

				

	}).catch(function(err){
		//console.log(err);
		console.log(ErrorLog('Easy there buddy !!!'));
		console.log(ErrorLog('Karm is already initialised'));
		process.exit(1);
		
	});


}