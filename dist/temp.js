"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initWiithNormalForm = () => ({
    data: {},
    IDs: [],
});
const mockData = [
    { id: 1, description: 'Task 1', status: 'todo', createdAt: '2021-07-01T00:00:00', updatedAt: '2021-07-01T00:00:00' },
    { id: 2, description: 'Task 2', status: 'todo', createdAt: '2021-07-01T00:00:00', updatedAt: '2021-07-01T00:00:00' },
    { id: 3, description: 'Task 3', status: 'done', createdAt: '2021-07-01T00:00:00', updatedAt: '2021-07-01T00:00:00' },
];
const dataFoo = initWiithNormalForm();
mockData.forEach((entry) => {
    dataFoo.data[entry.id] = entry;
    dataFoo.IDs.push(entry.id);
});
console.log(dataFoo);
const mockData2 = [
    { id: 4, description: 'Task 4', status: 'todo', createdAt: '2021-07-01T00:00:00', updatedAt: '2021-07-01T00:00:00' },
    { id: 5, description: 'Task 5', status: 'todo', createdAt: '2021-07-01T00:00:00', updatedAt: '2021-07-01T00:00:00' },
    { id: 6, description: 'Task 6', status: 'done', createdAt: '2021-07-01T00:00:00', updatedAt: '2021-07-01T00:00:00' },
];
const dataBar = mockData2.reduce((result, entry) => {
    return {
        data: Object.assign(Object.assign({}, result.data), { [entry.id]: entry }),
        IDs: [
            ...result.IDs, // Previous IDs 
            entry.id
        ],
    };
}, initWiithNormalForm());
console.log(dataBar);
