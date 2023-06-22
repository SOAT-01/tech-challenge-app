import { Cliente } from "@domain/entities/cliente";
import { ClienteRepository } from "@domain/repositories/clienteRepository.interface";
import { ClienteModel } from "../models";

export class ClienteMongoRepository implements ClienteRepository {
    constructor(private readonly clienteModel: typeof ClienteModel) {}

    public create(cliente: Cliente): Promise<Cliente> {
        return this.clienteModel.create({
            nome: cliente.nome,
            email: cliente.email.value,
            cpf: cliente?.cpf?.value,
        });
    }

    public getByCpf(cpf: string): Promise<Cliente> {
        return this.clienteModel.findOne({
            cpf: cpf,
            deleted: { $ne: true },
        });
    }

    public getByEmail(email: string): Promise<Cliente> {
        return this.clienteModel.findOne({
            email: email,
            deleted: { $ne: true },
        });
    }
}
