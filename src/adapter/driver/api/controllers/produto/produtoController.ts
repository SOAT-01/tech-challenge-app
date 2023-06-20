import { CategoriaEnum, Produto } from "@domain/entities/produto";
import { ProdutoUseCase } from "@useCases/produto/produto.interface";

import { Request, Response } from "express";

export class ProdutoController {
    private readonly produtoUseCase: ProdutoUseCase;

    constructor(produtoUseCase: ProdutoUseCase) {
        this.produtoUseCase = produtoUseCase;
    }

    public async post(req: Request, res: Response): Promise<Response> {
        const result = await this.produtoUseCase.createProduto(
            new Produto(req.body),
        );
        return res.status(200).json(result);
    }
    public async get(req: Request, res: Response): Promise<Response> {
        const { categoria } = req.params;

        const result = await this.produtoUseCase.getProdutoByCategoria(
            categoria as CategoriaEnum,
        );
        return res.status(200).json(result);
    }

    public async patch(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const result = await this.produtoUseCase.updateProduto(id, req.body);
        return res.status(200).json(result);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        await this.produtoUseCase.deleteProduto(id);
        return res.status(200).json();
    }
}
