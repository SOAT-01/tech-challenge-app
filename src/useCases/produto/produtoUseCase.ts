import { IProdutoUseCase } from "./produto.interface";
import { ProdutoDTO } from "./dto";
import { Produto, CategoriaEnum } from "entities/produto";
import { ProdutoGateway } from "interfaces/gateways";
import { AssertionConcern } from "utils/assertionConcern";
import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";

export class ProdutoUseCase implements IProdutoUseCase {
    constructor(private readonly produtoGateway: ProdutoGateway) {}

    public async create(data: ProdutoDTO): Promise<ProdutoDTO> {
        const newProduto = new Produto(data);
        return this.produtoGateway.create(newProduto);
    }

    public async getByCategoria(
        categoria: CategoriaEnum,
    ): Promise<ProdutoDTO[]> {
        return this.produtoGateway.getByCategoria(categoria);
    }

    public async update(
        id: string,
        produto: Omit<Partial<ProdutoDTO>, "id">,
    ): Promise<ProdutoDTO> {
        AssertionConcern.assertArgumentNotEmpty(produto, "Produto is required");
        const doesProdutoExists = await this.produtoGateway.getById(id);

        if (!doesProdutoExists) {
            throw new ResourceNotFoundError("Produto não encontrado");
        }

        return this.produtoGateway.update(id, produto);
    }

    public async delete(id: string): Promise<void> {
        const doesProdutoExists = await this.produtoGateway.getById(id);

        if (!doesProdutoExists) {
            throw new ResourceNotFoundError("Produto não encontrado");
        }

        await this.produtoGateway.delete(id);
    }
}
