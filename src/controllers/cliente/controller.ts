import { NextFunction, Request, Response } from "express";
import { ClienteDTO, ClienteUseCase } from "useCases";
import { StatusCode } from "utils/statusCode";

export class ClienteController {
    constructor(private readonly clienteUseCase: ClienteUseCase) {}

    public async post(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const data = req.body as ClienteDTO;

            const result = await this.clienteUseCase.create({
                nome: data.nome,
                email: data.email,
                cpf: data.cpf,
            });

            return res.status(StatusCode.created).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getByCpf(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const cpf = req.params.cpf;

            if (!cpf) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing identifier cpf" });
            }

            const result = await this.clienteUseCase.getByCpf(cpf);

            if (!result) {
                return res.status(StatusCode.notFound).end();
            }

            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getByEmail(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const email = req.params.email;

            if (!email) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing identifier email" });
            }

            const result = await this.clienteUseCase.getByEmail(email);

            if (!result) {
                return res.status(StatusCode.notFound).end();
            }

            return res.status(StatusCode.ok).json(result);
        } catch (error) {
            next(error);
        }
    }
}
