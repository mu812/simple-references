"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const tasks_1 = require("../handlers/tasks");
const taskCreateSchema = {
    type: "object",
    properties: {
        Title: { type: "string", minLength: 1, maxLength: 100 },
        Deadline: { type: "string", minLength: 1, maxLength: 100 },
        Description: { type: "string", minLength: 1, maxLength: 100 }
    },
    required: ["Title", "Deadline", "Description"]
};
const taskIdSchema = {
    type: "object",
    properties: {
        taskId: { type: "number" }
    },
    required: ["taskId"]
};
const tasksRouter = (app, _, done) => {
    app.get("", tasks_1.getAllTasks);
    app.post("/create", {
        schema: {
            body: taskCreateSchema
        }
    }, tasks_1.createNewTask);
    app.post("/complete", {
        schema: {
            body: taskIdSchema
        }
    }, tasks_1.completeTask);
    app.post("/delete", {
        schema: {
            body: taskIdSchema
        }
    }, tasks_1.deleteTask);
    done();
};
exports.tasksRouter = tasksRouter;
