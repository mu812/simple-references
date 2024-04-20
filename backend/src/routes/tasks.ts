import { FastifyPluginCallback } from "fastify"
import { getAllTasks, createNewTask, completeTask , deleteTask} from "../handlers/tasks";

const taskCreateSchema = {
    type: "object",
    properties: {
        Title: {type: "string", minLength: 1, maxLength: 100},
        Deadline: { type: "string", minLength: 1, maxLength: 100 },
        Description: { type: "string", minLength: 1, maxLength: 100 }
    },
    required: ["Title", "Deadline", "Description"]
}; 

const taskIdSchema = {
    type:"object",
    properties:{
        taskId:{type:"number"}
    },
    required: ["taskId"]
}

export const tasksRouter: FastifyPluginCallback = (app, _, done) =>{
    app.get("", getAllTasks ); 

    app.post("/create",{
        schema: {
            body: taskCreateSchema
        }
    }, createNewTask); 

    app.post("/complete", {
        schema:{
            body: taskIdSchema
        }
    }, completeTask); 

    app.post("/delete", {
        schema:{
            body: taskIdSchema
        }
    },deleteTask); 

    done(); 
}