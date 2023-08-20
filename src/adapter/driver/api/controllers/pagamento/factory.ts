import { PagamentoModel } from "@infra/mongo/models";
import { PagamentoMongoRepository } from "@infra/mongo/repositories";
import { PagamentoUseCase } from "@useCases/pagamento";
import { PagamentoController } from "./controller";

export class PagamentoControllerFactory {
    public static create(): PagamentoController {
        const pagamentoRepository = new PagamentoMongoRepository(
            PagamentoModel,
        );
        const pagamentoUseCase = new PagamentoUseCase(pagamentoRepository);
        return new PagamentoController(pagamentoUseCase);
    }
}
