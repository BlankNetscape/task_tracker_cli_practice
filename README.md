
# Task Tracker CLI

The application should run from the command line, accept user actions and inputs as arguments, and store the tasks in a JSON file. The user should be able to:

- Add, Update, and Delete tasks
- Mark a task as in progress or done
- List all tasks
- List all tasks that are done
- List all tasks that are not done
- List all tasks that are in progress


## Installation

Install __task_tracker_cli_practice__ with npm

```shell
  npm install
  npm run build
  npm run start
```
    
## Usage/Examples

```shell
# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```


## Additinal practice task requirements

### Task Properties
Each task should have the following properties:

* __id__: A unique identifier for the task
* __description__: A short description of the task
* __status__: The status of the task (todo, in-progress, done)
* __createdAt__: The date and time when the task was created
* __updatedAt__: The date and time when the task was last updated

Make sure to add these properties to the JSON file when adding a new task and update them when updating a task.



