var program = require('commander'),
	addKarm = require('./commands/addKarm.js'),
	initKarm = require('./commands/initKarm.js'),
  listKarm = require('./commands/listKarm.js'),
  modifyKarm = require('./commands/modifyKarm.js'),
  doneKarm = require('./commands/doneKarm.js'),
  historyKarm = require('./commands/historyKarm'),
  getOptionsFromCommaderObject = require('./helpers/cmdOptions.js').getOptionsFromCommaderObject;


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
  .option("-d, --due [dueDate] ",'Due date of task')
  .action(function(task, options){
    options = getOptionsFromCommaderObject(options);
    addKarm(task , options);
  });


program
  .command('list ')
  .description('list current tasks')
  .option("-p, --priority [priority]", "filter tasks by priority ")
  .option("-c, --category [category]" ,"specify tasks by category")
  .option("-d , --due [dueDate] ",'filter tasks by due date')
  .action(function(options){
    options = getOptionsFromCommaderObject(options);
    listKarm(options);
  });


program
  .command('modify [task-id]')
  .description('modify existing task')
  .option("-t, --task [description]", "set new task description")
  .option("-p, --priority [priority]", "set new  priority ")
  .option("-c, --category [category]" ,"set new category")
  .option("-d, --due [dueDate] ",'set new due date')
  .action(function(id , options){
    options = getOptionsFromCommaderObject(options);
    modifyKarm(id , options);
  });


program
  .command('done [task-id]')
  .description('mark task as done')
  .action(function(id){
    doneKarm(id);
  });

program
  .command('history')
  .description('show all completed tasks')
  .action(function(){
    historyKarm();
  });

program.parse(process.argv);
	
