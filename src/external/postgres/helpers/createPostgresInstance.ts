import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { serverConfig } from "config";

const postgresClient = postgres({
    host: serverConfig.postgres.host,
    port: serverConfig.postgres.port,
    database: serverConfig.postgres.database,
    user: serverConfig.postgres.user,
    password: serverConfig.postgres.password,
});

export const PostgresDB = drizzle(postgresClient);
