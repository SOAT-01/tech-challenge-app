import { CategoriaEnum, Produto } from "@domain/entities/produto";
import { ProdutoUseCase } from "@useCases/produto/types";

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
}
