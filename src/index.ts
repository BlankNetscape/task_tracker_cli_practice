#!/usr/bin/env node

import { Task, taskStatus, db as taskDb } from './task'

const { Command } = require('commander')
const figlet = require('figlet')

const program = new Command()

function main() {
	program.version('0.0.1').description('Manage your tasks using command line')

	program
		.command('add')
		.description('Add a new task')
		.argument('<description>', 'Task description')
		.action((description: string) => {
			const task: Task = {
                description: description,
                status: 'todo'
            }
            const result = taskDb.insert(task) 
            console.log(`Task added successfully (ID: ${result?.id})`)
		})

	program
		.command('update')
		.description('Add a new task')
		.argument('<id>', 'Task id')
		.argument('<description>', 'Task description')
		.action((id: number, description: string) => {
            const task: Task = {
                description: description
            }
            const result = taskDb.update(id, task)
			console.log(`Task updated successfully (ID: ${result?.id})`)
		})

	program
		.command('delete')
		.description('Delete a task')
		.argument('<id>', 'Task id')
		.action((id: number) => {
            const result = taskDb.delete(id)
            if (!result) {
                console.log(`Task not found (ID: ${id})`)
                return
            }
			console.log(`Task deleted successfully (ID: ${id})`)
		})

	program
		.command('list [status]')
		.description('List all tasks')
		.action((status: taskStatus | undefined) => {
            const tasks = taskDb.getAll(status)
            console.table(tasks, ['id', 'description', 'status', 'createdAt', 'updatedAt']);
		})

	program
		.command('mark-in-progress')
		.description('Mark a task in progress')
		.argument('<id>', 'Task id')
		.action((id: number) => {
			const result = taskDb.update(id, { status: 'in-progress' })
			if (!result) {
                console.log(`Task not found (ID: ${id})`)
                return
            }
			console.log(`Task marked as done (ID: ${id})`)
		})

	program
		.command('mark-done')
		.description('Mark a task done')
		.argument('<id>', 'Task id')
		.action((id: number) => {
			const result = taskDb.update(id, { status: 'done' })
			if (!result) {
                console.log(`Task not found (ID: ${id})`)
                return
            }
			console.log(`Task marked as done (ID: ${id})`)
		})

	program.addHelpText(
		'beforeAll',
		figlet.textSync('Tasklist CLI', { horizontalLayout: 'full' }),
	)
	program.parse(process.argv)
}

main()
