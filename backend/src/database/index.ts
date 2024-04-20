import sqlite from "sqlite3";
import { migrations } from "./schema.js";

export const query = async (
  database: sqlite.Database,
  sql: string
): Promise<any> =>
  new Promise((resolve, reject) => {
    database.all(sql, [], (error, rows) => {
      if (error) {
        reject(error);
      }
      resolve(rows);
    });
  });

export const execute = async (
  database: sqlite.Database,
  sql: string
): Promise<void> =>
  new Promise((resolve, reject) => {
    database.exec(sql, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });

export const connect = async (connectionString: string) => {
  const database = new sqlite.Database(connectionString);

  const schema_version = (await query(database, "PRAGMA schema_version"))[0]
    .schema_version;

  if (schema_version <= 0) {
    await applyMigrations(database, 0);
  } else {
    const version = (await query(database, "PRAGMA user_version"))[0]
      .user_version;

    await applyMigrations(database, version);
  }

  return database;
};

const applyMigrations = async (
  database: sqlite.Database,
  current_version: number
) => {
  if (current_version >= migrations.length) {
    return current_version;
  }

  let version = current_version;

  while (version < migrations.length) {
    version++;

    const migrationStatements = migrations[version - 1];

    for (let i = 0; i < migrationStatements.length; i++) {
      await execute(database, migrationStatements[i]);
    }
  }

  await execute(database, `PRAGMA user_version = ${version}`);

  return version;
};
