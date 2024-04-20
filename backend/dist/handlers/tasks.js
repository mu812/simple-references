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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.completeTask = exports.createNewTask = exports.getAllTasks = void 0;
const database_1 = require("../database");
const getAllTasks = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const database = request.diScope.resolve("database");
    const tasks = yield (0, database_1.query)(database, "SELECT * FROM Tasks");
    reply.code(201).send({ message: "succ", tasks });
});
exports.getAllTasks = getAllTasks;
const createNewTask = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const database = request.diScope.resolve("database");
    yield (0, database_1.execute)(database, `INSERT INTO "Tasks" (Title, Deadline, Description) VALUES 
    ("${request.body.Title}", "${request.body.Deadline}", "${request.body.Description}")`);
    reply.code(201).send({ message: "created" });
});
exports.createNewTask = createNewTask;
const completeTask = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const database = request.diScope.resolve("database");
    yield (0, database_1.execute)(database, `UPDATE Tasks SET IsCompleted= TRUE WHERE Id=
    ${request.body.taskId}`);
    reply.code(201).send({ message: "Updated" });
});
exports.completeTask = completeTask;
const deleteTask = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const database = request.diScope.resolve("database");
    yield (0, database_1.execute)(database, `DELETE FROM Tasks WHERE Id=${request.body.taskId}`);
    reply.code(201).send({ message: "Deleted" });
});
exports.deleteTask = deleteTask;
