var program = require('commander'),
	addKarm = require('./commands/addKarm.js'),
	initKarm = require('./commands/initKarm.js');


process.on('unhandledRejection', (reason) => {
    console.log('Reason: ' + reason);
});


program
  .version('0.0.1')

program
  .command('init')
  .description('initiliase configuration for karm')
  .action(function(){
    initKarm();
  });


// program
// 	.command('reconfig')
// 	.description('reload karm configuration settings')
// 	.action(function(){
// 		reconfigKarm();
// 	});


program
  .command('add <task>')
  .description('add new task')
  .option("-p, --priority [priority]", "set priority of task")
  .option("-c, --category [category]" ,"specify category of task")
  .option("--due [dueDate] ",'Due date of task')
  .action(function(task, options){
    addKarm(task , options);
  });


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
	
