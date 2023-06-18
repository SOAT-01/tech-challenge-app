import { parseEnvInt, parseEnvStr } from "./utils";

export const serverConfig = {
    env: parseEnvStr("NODE_ENV", "development"),
    port: parseEnvInt("PORT", 6001),
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "development",
    mongo: {
        dbName: parseEnvStr("MONGO_DB_NAME", "fast_food"),
        connectionString: parseEnvStr(
            "MONGODB_CONN_STRING",
            "mongodb://localhost:27017",
        ),
    },
} as const;
