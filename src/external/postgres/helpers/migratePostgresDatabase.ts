import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { serverConfig } from "config";

const postgresClient = postgres({
    host: serverConfig.postgres.host,
    port: serverConfig.postgres.port,
    database: serverConfig.postgres.database,
    user: serverConfig.postgres.user,
    password: serverConfig.postgres.password,
    max: 1,
});

const db = drizzle(postgresClient);

async function runMigrate() {
    console.log("Migrating Postgres...");
    await migrate(db, {
        migrationsFolder: serverConfig.postgres.migrationFolder,
    });
    console.log("Migrate complete.");
    process.exit(0);
}

runMigrate()
    .then()
    .catch((e) => {
        console.log(e);
        process.exit(0);
    });
