import { ClienteUseCase } from "useCases";
import { ClienteController } from "./controller";
import { ClientePostgresGateway } from "gateways/clienteGateway";
import { PostgresDB } from "external/postgres";
import { ClienteSchema } from "external/postgres/schemas";

export class ClienteControllerFactory {
    public static create(): ClienteController {
        const clienteGateway = new ClientePostgresGateway(
            PostgresDB,
            ClienteSchema,
        );
        const clienteUseCase = new ClienteUseCase(clienteGateway);
        return new ClienteController(clienteUseCase);
    }
}
