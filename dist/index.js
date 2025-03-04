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
        .command('list [status]')
        .description('List all tasks')
        .action((status) => {
        const tasks = task_1.db.getAll(status);
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
