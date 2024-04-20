import { startServer } from './fastify';
import { Lifetime, asFunction } from 'awilix';
import { connect } from './database';


async function main(){
    const database = await connect(":memory:");

    startServer({ host: "localhost", port: 8080 }, {
        database: asFunction(() => database, {
            lifetime: Lifetime.SINGLETON,
            dispose: (database) => database.close
        })
    });
}

main(); 
