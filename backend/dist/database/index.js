"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.execute = exports.query = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const schema_js_1 = require("./schema.js");
const query = (database, sql) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        database.all(sql, [], (error, rows) => {
            if (error) {
                reject(error);
            }
            resolve(rows);
        });
    });
});
exports.query = query;
const execute = (database, sql) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        database.exec(sql, (error) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    });
});
exports.execute = execute;
const connect = (connectionString) => __awaiter(void 0, void 0, void 0, function* () {
    const database = new sqlite3_1.default.Database(connectionString);
    const schema_version = (yield (0, exports.query)(database, "PRAGMA schema_version"))[0]
        .schema_version;
    if (schema_version <= 0) {
        yield applyMigrations(database, 0);
    }
    else {
        const version = (yield (0, exports.query)(database, "PRAGMA user_version"))[0]
            .user_version;
        yield applyMigrations(database, version);
    }
    return database;
});
exports.connect = connect;
const applyMigrations = (database, current_version) => __awaiter(void 0, void 0, void 0, function* () {
    if (current_version >= schema_js_1.migrations.length) {
        return current_version;
    }
    let version = current_version;
    while (version < schema_js_1.migrations.length) {
        version++;
        const migrationStatements = schema_js_1.migrations[version - 1];
        for (let i = 0; i < migrationStatements.length; i++) {
            yield (0, exports.execute)(database, migrationStatements[i]);
        }
    }
    yield (0, exports.execute)(database, `PRAGMA user_version = ${version}`);
    return version;
});
