import { FastifyError, FastifyRequest, FastifyReply } from "fastify";

export const errorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply)=>{
    console.log(error); 

    const statusCode = error.statusCode || 500; 
    const errorMessage = error.message || "Unexpected error"; 
    return reply.code(statusCode).send({message: errorMessage}); 
}