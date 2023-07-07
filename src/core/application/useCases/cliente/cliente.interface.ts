import { ClienteDTO } from "./dto";

export interface IClienteUseCase {
    create(data: ClienteDTO): Promise<ClienteDTO>;
    getByEmail(email: string): Promise<ClienteDTO | undefined>;
    getByCpf(cpf: string): Promise<ClienteDTO | undefined>;
}
