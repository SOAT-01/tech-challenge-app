import { Cpf } from "@valueObjects/cpf";
import { Email } from "@valueObjects/email";
import { ClienteMapper } from "adapters/mappers";
import { ResourceNotFoundError } from "@utils/errors/resourceNotFoundError";
import { IClienteUseCase } from "./cliente.interface";
import { ClienteDTO } from "./dto";
import { ClienteGateway } from "@interfaces/gateways/clienteGateway.interface";

export class ClienteUseCase implements IClienteUseCase {
    constructor(private readonly clienteGateway: ClienteGateway) {}

    public async create(data: ClienteDTO): Promise<ClienteDTO> {
        const newCliente = ClienteMapper.toDomain(data);

        const alreadyExists = await this.clienteGateway.checkDuplicate({
            cpf: newCliente.cpf.value,
            email: newCliente.email.value,
        });

        if (alreadyExists) throw new Error("Cliente already exists.");

        const result = await this.clienteGateway.create(newCliente);
        return ClienteMapper.toDTO(result);
    }

    public async getByCpf(cpf: string): Promise<ClienteDTO | undefined> {
        const result = await this.clienteGateway.getByCpf(
            Cpf.create(cpf).value,
        );

        if (!result) throw new ResourceNotFoundError("Cliente não encontrado");

        return ClienteMapper.toDTO(result);
    }

    public async getByEmail(email: string): Promise<ClienteDTO | undefined> {
        const result = await this.clienteGateway.getByEmail(
            Email.create(email).value,
        );

        if (!result) throw new ResourceNotFoundError("Cliente não encontrado");

        return ClienteMapper.toDTO(result);
    }
}
