import { Cradle, diContainer, fastifyAwilixPlugin } from "@fastify/awilix";
import { NameAndRegistrationPair } from "awilix";
import Fastify from "fastify"; 
import { errorHandler } from "./middlewares/errorHandlers";
import { tasksRouter } from "./routes/tasks";
import { FastifyRequest, FastifyReply } from "fastify";


interface hostAndPortInterface{
    host: string;
    port: number; 
}

export const startServer = (
    hostAndPort:hostAndPortInterface,
    di: NameAndRegistrationPair<Cradle>) =>{

        diContainer.register(di); 

        const fastify = Fastify({logger: true});

        fastify.register(fastifyAwilixPlugin); 

        fastify.setErrorHandler(errorHandler); 

    fastify.addHook("preHandler", (request: FastifyRequest, reply:FastifyReply, done)=>{
        reply.header("access-control-allow-origin", 'http://localhost:5173'); 
        reply.header("access-control-allow-methods", "GET, POST"); 
        reply.header("access-control-allow-headers", "Content-Type, Authorization");
        reply.header("access-control-allow-credentials", true); 
        if(request.method === "OPTIONS"){
            reply.code(200).send();
        }else{
            done(); 
        }
    }); 

        fastify.register(tasksRouter, {prefix: "tasks"})

        fastify.listen(hostAndPort); 
    }