import { and, eq, or, sql } from "drizzle-orm";
import { PostgresDB } from "external/postgres";
import { Cliente } from "entities/cliente";
import { ClienteGateway } from "interfaces/gateways";
import { ClienteMapper } from "adapters/mappers";
import { ClienteSchema } from "external/postgres/schemas";

export class ClientePostgresGateway implements ClienteGateway {
    constructor(
        private readonly postgresDB: typeof PostgresDB,
        private readonly clienteSchema: typeof ClienteSchema,
    ) {}

    public async create(cliente: Cliente): Promise<Cliente> {
        const [result] = await this.postgresDB
            .insert(this.clienteSchema)
            .values({
                nome: cliente.nome,
                email: cliente.email.value,
                cpf: cliente.cpf.value,
            })
            .returning();

        return ClienteMapper.toDomain(result);
    }

    public async getById(id: string): Promise<Cliente | undefined> {
        const [result] = await this.postgresDB
            .selectDistinct()
            .from(this.clienteSchema)
            .where(
                and(
                    eq(this.clienteSchema.id, id),
                    eq(this.clienteSchema.deleted, false),
                ),
            );

        if (!result) return undefined;

        return ClienteMapper.toDomain(result);
    }

    public async getByCpf(cpf: string): Promise<Cliente | undefined> {
        const [result] = await this.postgresDB
            .selectDistinct()
            .from(this.clienteSchema)
            .where(
                and(
                    eq(this.clienteSchema.cpf, cpf),
                    eq(this.clienteSchema.deleted, false),
                ),
            );

        if (!result) return undefined;

        return ClienteMapper.toDomain(result);
    }

    public async getByEmail(email: string): Promise<Cliente | undefined> {
        const [result] = await this.postgresDB
            .selectDistinct()
            .from(this.clienteSchema)
            .where(
                and(
                    eq(this.clienteSchema.email, email),
                    eq(this.clienteSchema.deleted, false),
                ),
            );

        if (!result) return undefined;

        return ClienteMapper.toDomain(result);
    }

    public async checkDuplicate(args: {
        email: string;
        cpf?: string;
    }): Promise<boolean> {
        const [result] = await this.postgresDB
            .select({ count: sql<number>`count(*)` })
            .from(this.clienteSchema)
            .where(
                or(
                    eq(this.clienteSchema.email, args.email),
                    eq(this.clienteSchema.cpf, args.cpf),
                ),
            );

        return result.count > 0;
    }
}
