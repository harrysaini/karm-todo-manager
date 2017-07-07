var program = require('commander'),
  color = require('colors'),
	addKarm = require('./commands/addKarm.js'),
	initKarm = require('./commands/initKarm.js'),
  listKarm = require('./commands/listKarm.js'),
  modifyKarm = require('./commands/modifyKarm.js'),
  doneKarm = require('./commands/doneKarm.js'),
  deleteKarm = require('./commands/deleteKarm.js'),
  historyKarm = require('./commands/historyKarm'),
  resetKarm = require('./commands/resetKarm'),
  getOptionsFromCommaderObject = require('./helpers/cmdOptions.js').getOptionsFromCommaderObject,
  isKarmInitialised = require('./storage/isAlreadyInitialised.js').isKarmInitialised;


process.on('unhandledRejection', function(reason){
    console.log('Reason: ' + reason);
});


program
  .version('0.0.7')

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

    isKarmInitialised().then(function(){
      addKarm(task , options);
    }).catch(function(err){
      printNotInitialisesMessage();
      //console.log(err);
    });

  });


program
  .command('list ')
  .description('list current tasks')
  .option("-p, --priority [priority]", "filter tasks by priority ")
  .option("-c, --category [category]" ,"specify tasks by category")
  .option("-d , --due [dueDate] ",'filter tasks by due date')
  .action(function(options){
    options = getOptionsFromCommaderObject(options);

    isKarmInitialised().then(function(){
      listKarm(options);
    }).catch(function(err){
      printNotInitialisesMessage();
      //console.log(err);
    });

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
    
    isKarmInitialised().then(function(){
      modifyKarm(id , options);
    }).catch(function(err){
      printNotInitialisesMessage();
      //console.log(err);
    })
    
  });


program
  .command('done [task-id]')
  .description('mark task as done')
  .action(function(id){

    isKarmInitialised().then(function(){
      doneKarm(id);
    }).catch(function(err){
      printNotInitialisesMessage();
      //console.log(err);
    })

    
  });

program
  .command('history')
  .description('show all completed tasks')
  .action(function(){

    isKarmInitialised().then(function(){
      historyKarm();
    }).catch(function(err){
      printNotInitialisesMessage();
      //console.log(err);
    });
    
  });

program
  .command('delete [task-id]')
  .description('completly delete pending task')
  .action(function(id){

    isKarmInitialised().then(function(){
      deleteKarm(id);
    }).catch(function(err){
      printNotInitialisesMessage();
      //console.log(err);
    })

  });


program
  .command('reset ')
  .description('reset karm , deletes all tasks and configurations')
  .action(function(){
    resetKarm();
  });

program.parse(process.argv);
	

function printNotInitialisesMessage(){
    console.log(color.red.bold('\n You must initiliase karm !!!  \n or \n try reset and initiliase again !!!'));
}
