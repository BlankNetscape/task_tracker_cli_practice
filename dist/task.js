"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const path_1 = __importDefault(require("path"));
const database_1 = require("./database");
const now = () => new Date().toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute: '2-digit', second: '2-digit' });
class TaskDatabase extends database_1.BaseDatabase {
    insert(entry) {
        const result = super.insert(Object.assign({ status: 'in-progress', createdAt: now() }, entry));
        return result;
    }
    update(id, newRecord) {
        const result = super.update(id, Object.assign(Object.assign({}, newRecord), { updatedAt: now() }));
        return result;
    }
    getAll(status) {
        let result = super.getAll();
        if (status) {
            result = result.filter((task) => task.status === status);
        }
        return result;
    }
}
const dbPath = path_1.default.join(__dirname, '../tasks.json');
exports.db = new TaskDatabase({ filePath: dbPath });
