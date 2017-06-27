# karm-todo-manager

A command line todo manager.

# How to install
will soon publish on npm

# How to use

## Commands

#### init command
```
karm init
```
Init basic configuration and storage files of karm.


#### add command
```
karm add 'Created new task' <options>
or
karm add 'get milk' -p H
```
Create new task.

| option | Description |
| --- | --- |
| -p , --priority | Set priority of task |
| -c , --category | Set category of task |
| -d , --due | Set due date of task |


#### list command
```
karm list <filters>
or
karm list -p H
```
Print all the pending tasks.

| option | Description |
| --- | --- |
| -p , --priority | filter by priority of task |
| -c , --category | filter by category of task |
| -d , --due | filter by  due date of task |


#### modify command
```
karm modify [id] --task 'get new ac' 
```
modify existing task

| option | Description |
| --- | --- |
| -t , --task | set new task description |
| -p , --priority | set new priority of task |
| -c , --category | set new category of task |
| -d , --due | set new  due date of task |


#### done command
```
karm done [id]
```
mark task as completed

#### history command
```
karm history
```
list all completed tasks

#### delete command
```
karm delete [id]
```
delete uncompleted task




Powered by : commader.js

Inspired by : taskwarrior task cli( just implemented basic functionality )
