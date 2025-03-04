import path from 'path'
import { BaseDatabase } from './database'

export interface Task {
	id?: number
	description: string
	status?: taskStatus
	createdAt?: string
	updatedAt?: string
}

export type taskStatus = 'todo' | 'done' | 'in-progress'

const now = () => new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'})

class TaskDatabase<T extends Task> extends BaseDatabase<T> {
	public insert(entry: Omit<T, 'id'>): T | null {
		const result = super.insert({ status: 'in-progress' as taskStatus, createdAt: now(), ...entry })
		return result
	}

	public update(id: number, newRecord: Partial<Omit<T, 'id'>>): T | null {
		const result = super.update(id, { ...newRecord, updatedAt: now() })
		return result
	}

    public getAll(status?: taskStatus): T[] {
        let result = super.getAll()
        if (status) {
            result = result.filter((task) => task.status === status)
        }
        return result
    }
}

const dbPath = path.join(__dirname, '../tasks.json')

export const db = new TaskDatabase<Task>({ filePath: dbPath })
