import { ClienteRepository } from "@domain/repositories/clienteRepository.interface";
import { Cpf, Email } from "@domain/valueObjects";
import { ResourceNotFoundError } from "@domain/errors/resourceNotFoundError";
import { ClienteMapper } from "@mappers/clienteMapper";
import { IClienteUseCase } from "./cliente.interface";
import { ClienteDTO } from "./dto";

export class ClienteUseCase implements IClienteUseCase {
    constructor(private readonly clienteRepository: ClienteRepository) {}

    public async create(data: ClienteDTO): Promise<ClienteDTO> {
        const newCliente = ClienteMapper.toDomain(data);

        const alreadyExists = await this.clienteRepository.checkDuplicate({
            cpf: newCliente.cpf.value,
            email: newCliente.email.value,
        });

        if (alreadyExists) throw new Error("Cliente already exists.");

        const result = await this.clienteRepository.create(newCliente);
        return ClienteMapper.toDTO(result);
    }

    public async getByCpf(cpf: string): Promise<ClienteDTO | undefined> {
        const result = await this.clienteRepository.getByCpf(
            Cpf.create(cpf).value,
        );

        if (!result) throw new ResourceNotFoundError("Cliente não encontrado");

        return ClienteMapper.toDTO(result);
    }

    public async getByEmail(email: string): Promise<ClienteDTO | undefined> {
        const result = await this.clienteRepository.getByEmail(
            Email.create(email).value,
        );

        if (!result) throw new ResourceNotFoundError("Cliente não encontrado");

        return ClienteMapper.toDTO(result);
    }
}
