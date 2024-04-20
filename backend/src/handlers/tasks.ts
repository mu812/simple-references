import { FastifyReply, FastifyRequest } from "fastify";
import { query,execute } from "../database";
import { Database } from "sqlite3";

export const getAllTasks = async(request:FastifyRequest , reply: FastifyReply)=>{
    const database:Database = request.diScope.resolve("database"); 
    
    const tasks = await query(database, "SELECT * FROM Tasks"); 

    reply.code(201).send({message: "succ", tasks}); 
}

interface createNewTaskBody{
    Title: string; 
    Deadline:string; 
    Description:string;
}

export const createNewTask = async (request: FastifyRequest<{ Body: createNewTaskBody }>, reply: FastifyReply)=>{
    const database:Database = request.diScope.resolve("database"); 

    await execute(database, `INSERT INTO "Tasks" (Title, Deadline, Description) VALUES 
    ("${request.body.Title}", "${request.body.Deadline}", "${request.body.Description}")`); 

    reply.code(201).send({message:"created"}); 
}


export const completeTask = async(request:FastifyRequest<{Body:{taskId:number;}}>, reply:FastifyReply)=>{
    const database:Database = request.diScope.resolve("database"); 

    await execute(database, `UPDATE Tasks SET IsCompleted= TRUE WHERE Id=
    ${request.body.taskId}`); 
    
    reply.code(201).send({message:"Updated"}); 
}


export const deleteTask = async(request: FastifyRequest<{Body:{taskId:string;}}>, reply:FastifyReply)=>{
    const database:Database = request.diScope.resolve("database"); 

    await execute(database, `DELETE FROM Tasks WHERE Id=${request.body.taskId}`); 

    reply.code(201).send({message: "Deleted"}); 
}


