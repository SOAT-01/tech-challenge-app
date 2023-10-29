import { serverConfig } from "config";
import type { Config } from "drizzle-kit";

export default {
    schema: serverConfig.postgres.schemaFolder,
    out: serverConfig.postgres.migrationFolder,
} satisfies Config;
