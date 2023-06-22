import { PedidoUseCase } from "@useCases/pedido";

import { Request, Response } from "express";

export class PedidoController {
    private readonly pedidoUseCase: PedidoUseCase;

    constructor(pedidoUseCase: PedidoUseCase) {
        this.pedidoUseCase = pedidoUseCase;
    }

    public async get(_: Request, res: Response): Promise<Response> {
        const result = await this.pedidoUseCase.getPedidos();
        return res.status(200).json(result);
    }

    public async patch(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const result = await this.pedidoUseCase.updatePedido(id, req.body);
        return res.status(200).json(result);
    }
}
