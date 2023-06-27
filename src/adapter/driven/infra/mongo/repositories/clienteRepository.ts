import { Cliente } from "@domain/entities/cliente";
import { ClienteRepository } from "@domain/repositories/clienteRepository.interface";
import { ClienteModel } from "../models";
import { Cpf, Email } from "@domain/valueObjects";

export class ClienteMongoRepository implements ClienteRepository {
    constructor(private readonly clienteModel: typeof ClienteModel) {}

    public async create(cliente: Cliente): Promise<Cliente> {
        const result = await this.clienteModel.create({
            nome: cliente.nome,
            email: cliente.email.value,
            cpf: cliente.cpf.value,
        });

        return new Cliente({
            id: result.id,
            nome: result.nome,
            cpf: Cpf.create(result.cpf),
            email: Email.create(result.email),
        });
    }

    public async getByCpf(cpf: string): Promise<Cliente> {
        const result = await this.clienteModel.findOne({
            cpf: cpf,
            deleted: { $ne: true },
        });

        return new Cliente({
            id: result.id,
            nome: result.nome,
            cpf: Cpf.create(result.cpf),
            email: Email.create(result.email),
        });
    }

    public async getByEmail(email: string): Promise<Cliente> {
        const result = await this.clienteModel.findOne({
            email: email,
            deleted: { $ne: true },
        });

        return new Cliente({
            id: result.id,
            nome: result.nome,
            cpf: Cpf.create(result.cpf),
            email: Email.create(result.email),
        });
    }

    public async checkDuplicate(args: {
        email: string;
        cpf?: string;
    }): Promise<boolean> {
        const result = await this.clienteModel.count({
            $or: [{ cpf: args.cpf, email: args.email }],
        });

        return result > 0;
    }
}
