import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    boolean,
} from "drizzle-orm/pg-core";

export const ClienteSchema = pgTable("clientes", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    nome: varchar("nome", { length: 256 }),
    email: varchar("email", { length: 256 }),
    cpf: varchar("cpf", { length: 256 }),
    deleted: boolean("deleted").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
