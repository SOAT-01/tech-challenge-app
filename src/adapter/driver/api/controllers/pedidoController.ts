import { Pedido } from "@domain/entities/pedido";
import { IPedidoUseCase } from "@useCases/pedido/pedido.interface";

import { Request, Response } from "express";

export class PedidoController {
    private readonly pedidoUseCase: IPedidoUseCase;

    constructor(pedidoUseCase: IPedidoUseCase) {
        this.pedidoUseCase = pedidoUseCase;
    }

    public async get(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const result = await this.pedidoUseCase.getPedidoById(id);
        return res.status(200).json(result);
    }

    public async post(req: Request, res: Response): Promise<Response> {
        try {
            const result = await this.pedidoUseCase.createPedido(
                new Pedido(req.body),
            );
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        await this.pedidoUseCase.deletePedido(id);
        return res.status(200).json();
    }
}
