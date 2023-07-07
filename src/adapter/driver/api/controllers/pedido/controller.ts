import { NextFunction, Request, Response } from "express";
import { PedidoUseCase } from "@useCases/pedido";
import { StatusCode } from "@utils/statusCode";

export class PedidoController {
    constructor(private readonly pedidoUseCase: PedidoUseCase) {}

    public async get(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const result = await this.pedidoUseCase.getAll();
            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async post(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const result = await this.pedidoUseCase.create(req.body);
            return res.status(StatusCode.created).json(result);
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
            const result = await this.pedidoUseCase.update(id, req.body);
            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async patchPaymentStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        const { id } = req.params;

        try {
            const result = await this.pedidoUseCase.updatePaymentStatus(id);
            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }
}
