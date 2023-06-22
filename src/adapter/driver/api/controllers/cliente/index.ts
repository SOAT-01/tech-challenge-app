import { Request, Response } from "express";
import { ClienteUseCase } from "@useCases/user";
import { Cliente } from "@domain/entities/cliente";
import { Cpf, Email } from "@domain/valueObjects";
import { CreateClienteRequestBody } from "../../types/cliente-request";

export class ClienteController {
    constructor(private readonly clienteUseCase: ClienteUseCase) {}

    public async post(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body as CreateClienteRequestBody;
            const cpf = data?.cpf ? Cpf.create(data.cpf) : null;
            const newCliente = new Cliente({
                nome: data.nome,
                email: Email.create(data.email),
                cpf: cpf,
            });

            const result = await this.clienteUseCase.create(newCliente);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error?.message });
        }
    }

    public async getByEmail(req: Request, res: Response): Promise<Response> {
        try {
            const email = req.params.email;

            if (!email) {
                return res
                    .status(401)
                    .json({ message: "Missing identifier email" });
            }

            const result = await this.clienteUseCase.getByEmail(email);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error?.message });
        }
    }

    public async getByCpf(req: Request, res: Response): Promise<Response> {
        try {
            const cpf = req.params.cpf;

            if (!cpf) {
                return res
                    .status(401)
                    .json({ message: "Missing identifier cpf" });
            }

            const result = await this.clienteUseCase.getByCpf(cpf);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ message: error?.message });
        }
    }
}
