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
    postgres: {
        database: parseEnvStr("POSTGRES_DB", "fast_food"),
        host: parseEnvStr("POSTGRES_DB_HOST", "127.0.0.1"),
        port: parseEnvInt("POSTGRES_DB_PORT", 5432),
        user: parseEnvStr("POSTGRES_DB_USER", "root"),
        password: parseEnvStr("POSTGRES_DB_PASSWORD", "root"),
        schemaFolder: "./src/external/postgres/schemas/*",
        migrationFolder: "./src/external/postgres/migrations",
    },
    mercadoPago: {
        apiUrl: "https://api.mercadopago.com",
        userId: parseEnvStr("MERCADO_PAGO_USER_ID", "379061219"),
        pos: parseEnvStr("MERCADO_PAGO_POS", "STORE001POS001"),
        token: parseEnvStr(
            "MERCADO_PAGO_TOKEN",
            "TEST-2732348911740652-082612-1a10554b72bc3f53eab52110003023d0-379061219",
        ),
    },
} as const;
