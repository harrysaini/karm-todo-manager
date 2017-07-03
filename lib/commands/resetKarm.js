const color = require('colors');
const readConsoleInput = require('../helpers/readConsoleInput.js');
const removeKarmFolder  = require('../storage/removeFiles.js').removeKarmFolder;
const removeLocalConfigFile = require('../storage/removeFiles.js').removeLocalConfigFile;



/*
*Function to print welcome message
*/
function printResetConfirmMessage(){
	console.log(
		color.cyan('Reseting karm will delete all the local storage files ')
		);
	console.log(
		color.cyan('All the tasks will be deleted')
		);
	console.log(
		color.cyan('Init again to continue with karm')
		);
	console.log();
}

/*
*Function to get reset permisions
*/
function getResetPermissions(){

	return new Promise(function(resolve , reject){
		var question = 'Do you want to continue? (yes) or (no) -> ';
		readConsoleInput.getUserResponse(question , function(answer){
			if(answer==='yes'){
				resolve();
			}else{
				reject();
			}	
		});

	});
	

}




module.exports = function resetKarm(){
	
	printResetConfirmMessage();

	getResetPermissions().then(function(){
		return removeKarmFolder();
	}).then(function(){
		return removeLocalConfigFile();
	}).then(function(){
		console.log(color.green("All files and folders deleted"));
	}).catch(function(err){
		console.log(err);
		console.log(err.stack);
	});


}