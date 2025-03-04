#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("./task");
const { Command } = require('commander');
const figlet = require('figlet');
const program = new Command();
function main() {
    program.version('0.0.1').description('Manage your tasks using command line');
    program
        .command('add')
        .description('Add a new task')
        .argument('<description>', 'Task description')
        .action((description) => {
        const task = {
            description: description,
            status: 'todo'
        };
        const result = task_1.db.insert(task);
        console.log(`Task added successfully (ID: ${result === null || result === void 0 ? void 0 : result.id})`);
    });
    program
        .command('update')
        .description('Add a new task')
        .argument('<id>', 'Task id')
        .argument('<description>', 'Task description')
        .action((id, description) => {
        const task = {
            description: description
        };
        const result = task_1.db.update(id, task);
        console.log(`Task updated successfully (ID: ${result === null || result === void 0 ? void 0 : result.id})`);
    });
    program
        .command('delete')
        .description('Delete a task')
        .argument('<id>', 'Task id')
        .action((id) => {
        const result = task_1.db.delete(id);
        if (!result) {
            console.log(`Task not found (ID: ${id})`);
            return;
        }
        console.log(`Task deleted successfully (ID: ${id})`);
    });
    program
        .command('clear')
        .description('Delete all tasks')
        .action(() => {
        const result = task_1.db.deleteAll();
        console.log(`Tasks cleared successfully`);
    });
    program
        .command('list [status]')
        .description('List all tasks. Optional \'status\' fileter: \'done\', \'in-progress\', or \'todo\'')
        .action((status) => {
        let tasks = task_1.db.getAll(status);
        if (task_1.taskStatuses.includes(status)) {
            tasks = tasks.filter((task) => task.status === status);
        }
        else {
            console.log(`Task status not found: ${status}`);
        }
        console.table(tasks, ['id', 'description', 'status', 'createdAt', 'updatedAt']);
    });
    program
        .command('mark-in-progress')
        .description('Mark a task in progress')
        .argument('<id>', 'Task id')
        .action((id) => {
        const result = task_1.db.update(id, { status: 'in-progress' });
        if (!result) {
            console.log(`Task not found (ID: ${id})`);
            return;
        }
        console.log(`Task marked as done (ID: ${id})`);
    });
    program
        .command('mark-done')
        .description('Mark a task done')
        .argument('<id>', 'Task id')
        .action((id) => {
        const result = task_1.db.update(id, { status: 'done' });
        if (!result) {
            console.log(`Task not found (ID: ${id})`);
            return;
        }
        console.log(`Task marked as done (ID: ${id})`);
    });
    program.addHelpText('beforeAll', figlet.textSync('Tasklist CLI', { horizontalLayout: 'full' }));
    program.parse(process.argv);
}
main();
