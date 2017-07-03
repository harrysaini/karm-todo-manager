const color = require('colors'),
fs = require('fs'),
fse = require('fs-extra'),
ErrorLog = color.bold.red ;


function fsReadFile(fPath){
	return new Promise(function(resolve,reject){
		fs.readFile(fPath,"utf-8",function(err,data){
			if(err){
				console.log(ErrorLog('failed to read file ->'+fPath));
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
				console.log(ErrorLog('failed to write file at ->'+fPath));
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
				console.log(ErrorLog('failed to create directory ->'+directory));
				reject(err);
			}
			resolve(data);
		})
	})
}

function fsExists(directory){
	return new Promise(function(resolve,reject){
		fs.exists(directory , function(exists){
			if(exists){
				resolve();
			}else{	
				reject("Error : missing path ->"+directory);	
			}
		});
	});
}


function fseRemove(directory){
	return new Promise(function(resolve,reject){
		fse.remove(directory, function(err){
			if(err){
				console.log(ErrorLog('failed to remove path ->'+directory));
				reject(err);
			}

			resolve(err);
		});
	});
}


function fsUnlink(fpath){
	return new Promise(function(resolve,reject){
		fs.unlink(fpath, function(err){
			if(err){
				console.log(ErrorLog('failed to remove file ->'+fpath));
				reject(err);
			}

			resolve(err);
		});
	})
}


module.exports ={
	fsReadFile:fsReadFile,
	fsWriteFile:fsWriteFile,
	fsMakeDirectory:fsMakeDirectory,
	fsExists:fsExists,
	fseRemove:fseRemove,
	fsUnlink:fsUnlink
}