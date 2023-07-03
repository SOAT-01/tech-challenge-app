import { ClienteModel } from "@infra/mongo/models";
import { ClienteMongoRepository } from "@infra/mongo/repositories";
import { ClienteUseCase } from "@useCases/cliente";
import { ClienteController } from "./controller";

export class ClienteControllerFactory {
    public static create(): ClienteController {
        const clienteRepository = new ClienteMongoRepository(ClienteModel);
        const clienteUseCase = new ClienteUseCase(clienteRepository);
        return new ClienteController(clienteUseCase);
    }
}
