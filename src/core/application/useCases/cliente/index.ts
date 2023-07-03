import { Cliente } from "@domain/entities/cliente";
import { ClienteRepository } from "@domain/repositories/clienteRepository.interface";
import { Cpf, Email } from "@domain/valueObjects";
import { IClienteUseCase } from "./cliente.interface";
import { ClienteDTO } from "./dto";

export class ClienteUseCase implements IClienteUseCase {
    constructor(private readonly clienteRepository: ClienteRepository) {}

    public async create(data: ClienteDTO): Promise<Cliente> {
        const newCliente = new Cliente({
            nome: data.nome,
            email: Email.create(data.email),
            cpf: Cpf.create(data.cpf),
        });

        const alreadyExists = await this.clienteRepository.checkDuplicate({
            cpf: newCliente.cpf.value,
            email: newCliente.email.value,
        });

        if (alreadyExists) throw new Error("Cliente already exists.");

        return this.clienteRepository.create(newCliente);
    }

    public async getByCpf(cpf: string): Promise<Cliente | undefined> {
        return this.clienteRepository.getByCpf(Cpf.create(cpf).value);
    }

    public async getByEmail(email: string): Promise<Cliente | undefined> {
        return this.clienteRepository.getByEmail(Email.create(email).value);
    }
}
