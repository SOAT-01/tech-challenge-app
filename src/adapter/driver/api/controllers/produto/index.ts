import { Request, Response } from "express";
import { CategoriaEnum, Produto } from "@domain/entities/produto";
import { ProdutoUseCase } from "@useCases/produto";
import { StatusCode } from "@utils/statusCode";

export class ProdutoController {
    private readonly produtoUseCase: ProdutoUseCase;

    constructor(produtoUseCase: ProdutoUseCase) {
        this.produtoUseCase = produtoUseCase;
    }

    public async post(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.produtoUseCase.createProduto(
                new Produto(req.body),
            );

            return res.status(StatusCode.created).json(result);
        } catch (error) {
            return res
                .status(StatusCode.badRequest)
                .json({ message: error?.message });
        }
    }

    public async get(req: Request, res: Response): Promise<Response> {
        try {
            const { categoria } = req.params;

            const result = await this.produtoUseCase.getProdutoByCategoria(
                categoria as CategoriaEnum,
            );

            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            return res
                .status(StatusCode.badRequest)
                .json({ message: error?.message });
        }
    }

    public async patch(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const result = await this.produtoUseCase.updateProduto(
                id,
                req.body,
            );

            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            return res
                .status(StatusCode.badRequest)
                .json({ message: error?.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            await this.produtoUseCase.deleteProduto(id);

            return res.status(StatusCode.ok).json();
        } catch (error) {
            return res
                .status(StatusCode.badRequest)
                .json({ message: error?.message });
        }
    }
}
