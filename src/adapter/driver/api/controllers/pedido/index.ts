import { PedidoUseCase } from "@useCases/pedido";
import { StatusCode } from "@utils/statusCode";

import { Request, Response } from "express";

export class PedidoController {
    private readonly pedidoUseCase: PedidoUseCase;

    constructor(pedidoUseCase: PedidoUseCase) {
        this.pedidoUseCase = pedidoUseCase;
    }

    public async get(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.pedidoUseCase.getAll(req.query);
            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            return res
                .status(StatusCode.badRequest)
                .json({ message: error?.message });
        }
    }

    public async post(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.pedidoUseCase.create(req.body);
            return res.status(StatusCode.created).json(result);
        } catch (error) {
            return res
                .status(StatusCode.serverError)
                .json({ message: error?.message });
        }
    }

    public async patch(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const result = await this.pedidoUseCase.update(id, req.body);
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

            await this.pedidoUseCase.delete(id);

            return res.status(StatusCode.noContent).json();
        } catch (error) {
            return res
                .status(StatusCode.serverError)
                .json({ message: error?.message });
        }
    }
}
