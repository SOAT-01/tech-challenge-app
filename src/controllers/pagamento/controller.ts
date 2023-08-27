import { NextFunction, Request, Response } from "express";
import { PagamentoUseCase } from "useCases";
import { StatusCode } from "utils/statusCode";

export class PagamentoController {
    constructor(private readonly pagamentoUseCase: PagamentoUseCase) {}

    public async post(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const result = await this.pagamentoUseCase.create(req.body);
            return res.status(StatusCode.created).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getById(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const id = req.params.id;

            if (!id) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing identifier id" });
            }

            const result = await this.pagamentoUseCase.getById(id);

            if (!result) {
                return res.status(StatusCode.notFound).end();
            }

            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async patch(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        const { id } = req.params;

        try {
            const result = await this.pagamentoUseCase.update(id, req.body);
            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }
}
