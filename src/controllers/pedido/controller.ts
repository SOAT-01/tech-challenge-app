import { NextFunction, Request, Response } from "express";
import { PedidoUseCase } from "useCases";
import { StatusCode } from "utils/statusCode";

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

    public async getAllOrderedByStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const result = await this.pedidoUseCase.getAllOrderedByStatus();
            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getPaymentStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        const { id } = req.params;

        try {
            const result = await this.pedidoUseCase.getPaymentStatus(id);
            return res
                .status(StatusCode.ok)
                .json({ pagamento: result.pagamento });
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
            const result = await this.pedidoUseCase.checkout(req.body);
            return res.status(StatusCode.created).json({ id: result.id });
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

    public async patchStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        const { id } = req.params;

        try {
            const result = await this.pedidoUseCase.updateStatus(
                id,
                req.body?.status ?? undefined,
            );
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
