"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, request, reply) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Unexpected error";
    return reply.code(statusCode).send({ message: errorMessage });
};
exports.errorHandler = errorHandler;
