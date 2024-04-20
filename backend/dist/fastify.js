"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const awilix_1 = require("@fastify/awilix");
const fastify_1 = __importDefault(require("fastify"));
const errorHandlers_1 = require("./middlewares/errorHandlers");
const tasks_1 = require("./routes/tasks");
const startServer = (hostAndPort, di) => {
    awilix_1.diContainer.register(di);
    const fastify = (0, fastify_1.default)({ logger: true });
    fastify.register(awilix_1.fastifyAwilixPlugin);
    fastify.setErrorHandler(errorHandlers_1.errorHandler);
    fastify.addHook("preHandler", (request, reply, done) => {
        reply.header("access-control-allow-origin", 'http://localhost:5173');
        reply.header("access-control-allow-methods", "GET, POST");
        reply.header("access-control-allow-headers", "Content-Type, Authorization");
        reply.header("access-control-allow-credentials", true);
        if (request.method === "OPTIONS") {
            reply.code(200).send();
        }
        else {
            done();
        }
    });
    fastify.register(tasks_1.tasksRouter, { prefix: "tasks" });
    fastify.listen(hostAndPort);
};
exports.startServer = startServer;
