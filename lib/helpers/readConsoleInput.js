const readline = require('readline');


function getUserResponse(question , callback){

	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question(question , function(answer){
		callback(answer);
		rl.close();
	})

	
}


module.exports ={
	getUserResponse  :getUserResponse
}