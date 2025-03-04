import * as fs from 'fs'

export type DatabaseOptions = {
	filePath: string
}

export type Entity = {
	id?: number
}

type normalizeData<T> = {
	data: { [key: number]: T } // { 1: Onjerct, 2: Object, ... }
	ids: number[]
}

const initilizeData = <T>(): normalizeData<T> => ({
	data: {},
	ids: [],
})

export class BaseDatabase<T extends Entity> {
	private readonly filePath: string
	private data: normalizeData<T>
	private incrementalId = 1

	constructor(options: DatabaseOptions) {
		this.filePath = options.filePath
		this.data = initilizeData<T>()
		this.loadData()
	}

	private loadData() {
		if (fs.existsSync(this.filePath)) {
			const rawData: T[] = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'))
			this.data = initilizeData<T>()
			// NOTE: Separates each item's ID from the object itself to maintain data immutability
			rawData.forEach((entry) => {
				this.data.data[entry.id as number] = entry
				this.data.ids.push(entry.id as number)
			})
		}
		this.incrementalId = this.data.ids.length == 0 ? 1 : Math.max(...this.data.ids) + 1
	}

	private saveData() {
        const rawData = Object.values(this.data.data) as T[]
        fs.writeFileSync(this.filePath, JSON.stringify(rawData, null, 2), 'utf-8')
    }

	public getAll(): T[] {
		return this.data.ids.map(id => this.data.data[id as number]) as T[] || []
	}

	public getById(id: number): T | null {
		return this.data.data[id] as T || null
	}

	public insert(entry: Omit<T, 'id'>): T | null {
		const id = this.incrementalId++
        const newEntry = { ...entry, id: id as T['id'] } as T
        this.data.data[id as number] = newEntry
        this.data.ids.push(id as number)
        this.saveData()
        return this.getById(id) as T
	}

	public update(id: number, newRecord: Partial<Omit<T, 'id'>>): T | null {
		if (!this.getById(id as number)) return null
        this.data.data[id as number] = { ...this.data.data[id as number], ...newRecord } as T
        this.saveData()
        return this.getById(id as number) as T
	}

	public delete(id: number): boolean {
		if (!this.getById(id as number)) return false
        delete this.data.data[id as number]
        this.data.ids = this.data.ids.filter((i) => i !== id)
        this.saveData()
        return true
	}

	public deleteAll() {
		this.data = initilizeData<T>()
        this.saveData()
	}
}
