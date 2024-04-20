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
const fastify_1 = require("./fastify");
const awilix_1 = require("awilix");
const database_1 = require("./database");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const database = yield (0, database_1.connect)(":memory:");
        (0, fastify_1.startServer)({ host: "localhost", port: 8080 }, {
            database: (0, awilix_1.asFunction)(() => database, {
                lifetime: awilix_1.Lifetime.SINGLETON,
                dispose: (database) => database.close
            })
        });
    });
}
main();
