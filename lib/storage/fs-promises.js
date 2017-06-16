const chalk = require('chalk'),
fs = require('fs'),
ErrorLog = chalk.bold.red ;


function fsReadFile(fPath){
	return new Promise(function(resolve,reject){
		fs.readFile(fPath,"utf-8",function(err,data){
			if(err){
				//console.log(err);
				console.log(ErrorLog('failed to read file'));
				reject(err);
			}
			resolve(data);
		});
	});
}


function fsWriteFile(fPath,data){
	return new Promise(function(resolve,reject){
		fs.writeFile(fPath,data,function(err,data){
			if(err){
				//console.log(err);
				console.log(ErrorLog('failed to write file'));
				reject(err);
			}
			resolve(data);
		});
	});
}

function fsMakeDirectory(directory){
	return new Promise(function(resolve,reject){
		fs.mkdir(directory , function(err,data){
			if(err){
				reject(err);
			}
			resolve(data);
		})
	})
}


module.exports ={
	fsReadFile:fsReadFile,
	fsWriteFile:fsWriteFile,
	fsMakeDirectory:fsMakeDirectory
}