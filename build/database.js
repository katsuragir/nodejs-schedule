"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
const local = promise_mysql_1.default.createPool(keys_1.default.local);
const retailht = promise_mysql_1.default.createPool(keys_1.default.retailht);
pool.getConnection()
    .then(connection => {
    pool.releaseConnection(connection);
    console.log('DB Cloud is connected');
});
local.getConnection()
    .then(connection => {
        local.releaseConnection(connection);
	console.log('DB local is connected');
});
retailht.getConnection()
.then(connection => {
    retailht.releaseConnection(connection);
console.log('DB retail ht is connected');
});
exports.default = pool;
exports.local = local;
exports.retailht = retailht;
