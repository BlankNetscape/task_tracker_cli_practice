"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
const fs = __importStar(require("fs"));
const initilizeData = () => ({
    data: {},
    ids: [],
});
class BaseDatabase {
    constructor(options) {
        this.incrementalId = 1;
        this.filePath = options.filePath;
        this.data = initilizeData();
        this.loadData();
    }
    loadData() {
        if (fs.existsSync(this.filePath)) {
            const rawData = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
            this.data = initilizeData();
            // NOTE: Separates each item's ID from the object itself to maintain data immutability
            rawData.forEach((entry) => {
                this.data.data[entry.id] = entry;
                this.data.ids.push(entry.id);
            });
        }
        this.incrementalId = this.data.ids.length == 0 ? 1 : Math.max(...this.data.ids) + 1;
    }
    saveData() {
        const rawData = Object.values(this.data.data);
        fs.writeFileSync(this.filePath, JSON.stringify(rawData, null, 2), 'utf-8');
    }
    getAll() {
        return this.data.ids.map(id => this.data.data[id]) || [];
    }
    getById(id) {
        return this.data.data[id] || null;
    }
    insert(entry) {
        const id = this.incrementalId++;
        const newEntry = Object.assign(Object.assign({}, entry), { id: id });
        this.data.data[id] = newEntry;
        this.data.ids.push(id);
        this.saveData();
        return this.getById(id);
    }
    update(id, newRecord) {
        if (!this.getById(id))
            return null;
        this.data.data[id] = Object.assign(Object.assign({}, this.data.data[id]), newRecord);
        this.saveData();
        return this.getById(id);
    }
    delete(id) {
        if (!this.getById(id))
            return false;
        delete this.data.data[id];
        this.data.ids = this.data.ids.filter((i) => i !== id);
        this.saveData();
        return true;
    }
    deleteAll() {
        this.data = initilizeData();
        this.saveData();
    }
}
exports.BaseDatabase = BaseDatabase;
