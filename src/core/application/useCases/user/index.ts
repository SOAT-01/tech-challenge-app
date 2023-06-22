import { Cliente } from "@domain/entities/cliente";
import { ClienteRepository } from "@domain/repositories/clienteRepository.interface";
import { IClienteUseCase } from "./cliente.interface";

export class ClienteUseCase implements IClienteUseCase {
    constructor(private readonly clienteRepository: ClienteRepository) {}

    public async create(cliente: Cliente): Promise<Cliente> {
        const jaExiste = await this.clienteRepository.verificarDuplicado({
            cpf: cliente.cpf.value,
            email: cliente.email.value,
        });

        if (jaExiste) throw new Error("Cliente already exists.");

        return this.clienteRepository.create(cliente);
    }

    public getByCpf(cpf: string): Promise<Cliente> {
        return this.clienteRepository.getByCpf(cpf);
    }

    public getByEmail(email: string): Promise<Cliente> {
        return this.clienteRepository.getByEmail(email);
    }
}
