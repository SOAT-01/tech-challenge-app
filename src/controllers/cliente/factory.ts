import { ClienteUseCase } from "useCases";
import { ClienteController } from "./controller";
import { ClienteMongoGateway } from "gateways/clienteGateway";
import { ClienteModel } from "external/mongo/models";

export class ClienteControllerFactory {
    public static create(): ClienteController {
        const clienteGateway = new ClienteMongoGateway(ClienteModel);
        const clienteUseCase = new ClienteUseCase(clienteGateway);
        return new ClienteController(clienteUseCase);
    }
}
