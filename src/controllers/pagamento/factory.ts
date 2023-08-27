import { PagamentoModel } from "external/mongo/models";
import { PagamentoMongoGateway } from "gateways/pagamentoGateway";
import { PagamentoUseCase } from "useCases";
import { PagamentoController } from "./controller";

export class PagamentoControllerFactory {
    public static create(): PagamentoController {
        const pagamentoRepository = new PagamentoMongoGateway(PagamentoModel);
        const pagamentoUseCase = new PagamentoUseCase(pagamentoRepository);
        return new PagamentoController(pagamentoUseCase);
    }
}
