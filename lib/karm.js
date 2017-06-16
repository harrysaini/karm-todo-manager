var program = require('commander'),
	//addTask = require('commands/addTask.js'),
	initKarm = require('./commands/initKarm.js');


program
  .version('0.0.1')

program
  .command('init')
  .description('initiliase configuration for karm')
  .action(function(task, options){
    initKarm();
  });


// program
//   .command('add <task>')
//   .description('add new task')
//   .option("-p, --priority [priority]", "set priority of task")
//   .action(function(task, options){
//     addTask(task , options);
//   });


// program
//   .command('exec <cmd>')
//   .alias('ex')
//   .description('execute the given remote cmd')
//   .option("-e, --exec_mode <mode>", "Which exec mode to use")
//   .action(function(cmd, options){
//     console.log('exec "%s" using %s mode', cmd, options.exec_mode);
//   }).on('--help', function() {
//     console.log('  Examples:');
//     console.log();
//     console.log('    $ deploy exec sequential');
//     console.log('    $ deploy exec async');
//     console.log();
//   });

program.parse(process.argv);
	
