import { Task, taskStatus } from "./task"

type normalForm<T> = {
	data: { [id: number]: T }
	IDs: number[]
}

const initWiithNormalForm = <T>(): normalForm<T> => ({
	data: {},
	IDs: [],
})

const mockData: Task[] = [
    { id: 1, description: 'Task 1', status: 'todo' as taskStatus, createdAt: '2021-07-01T00:00:00', updatedAt: '2021-07-01T00:00:00' },
    { id: 2, description: 'Task 2', status: 'todo' as taskStatus, createdAt: '2021-07-01T00:00:00', updatedAt: '2021-07-01T00:00:00' },
    { id: 3, description: 'Task 3', status: 'done' as taskStatus, createdAt: '2021-07-01T00:00:00', updatedAt: '2021-07-01T00:00:00' },
]

const dataFoo = initWiithNormalForm<Task>()
mockData.forEach((entry) => {
    dataFoo.data[entry.id as number] = entry
    dataFoo.IDs.push(entry.id as number)
})

console.log(dataFoo);

const mockData2: any[] = [
    { id: 4, description: 'Task 4', status: 'todo', createdAt: '2021-07-01T00:00:00', updatedAt: '2021-07-01T00:00:00' },
    { id: 5, description: 'Task 5', status: 'todo', createdAt: '2021-07-01T00:00:00', updatedAt: '2021-07-01T00:00:00' },
    { id: 6, description: 'Task 6', status: 'done', createdAt: '2021-07-01T00:00:00', updatedAt: '2021-07-01T00:00:00' },
]
const dataBar = mockData2.reduce<normalForm<Task>>((result, entry) => {
    return {
        data: {
            ...result.data, // Previous entries
            [entry.id as number]: entry,
        },
        IDs: [
            ...result.IDs, // Previous IDs 
            entry.id as number
        ],
    }
}, initWiithNormalForm<Task>())

console.log(dataBar);
