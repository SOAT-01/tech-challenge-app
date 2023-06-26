import { Request, Response } from "express";
import { Cliente } from "@domain/entities/cliente";
import { Cpf, Email } from "@domain/valueObjects";
import { ClienteUseCase } from "@useCases/cliente";
import { ClienteMapper } from "@mappers/clienteMapper";
import { CreateClienteRequestBody } from "@apiTypes/cliente";
import { StatusCode } from "@utils/statusCode";

export class ClienteController {
    constructor(private readonly clienteUseCase: ClienteUseCase) {}

    public async post(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body as CreateClienteRequestBody;

            const newCliente = new Cliente({
                nome: data.nome,
                email: Email.create(data.email),
                cpf: Cpf.create(data.cpf),
            });

            const result = await this.clienteUseCase.create(newCliente);

            return res
                .status(StatusCode.created)
                .json(ClienteMapper.toResponse(result));
        } catch (error) {
            return res
                .status(StatusCode.badRequest)
                .json({ message: error?.message });
        }
    }

    public async getByEmail(req: Request, res: Response): Promise<Response> {
        try {
            const email = req.params.email;

            if (!email) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing identifier email" });
            }

            const result = await this.clienteUseCase.getByEmail(
                Email.create(email),
            );

            return res
                .status(StatusCode.ok)
                .json(ClienteMapper.toResponse(result));
        } catch (error) {
            return res
                .status(StatusCode.badRequest)
                .json({ message: error?.message });
        }
    }

    public async getByCpf(req: Request, res: Response): Promise<Response> {
        try {
            const cpf = req.params.cpf;

            if (!cpf) {
                return res
                    .status(StatusCode.unprocessableEntity)
                    .json({ message: "Missing identifier cpf" });
            }

            const result = await this.clienteUseCase.getByCpf(Cpf.create(cpf));

            return res
                .status(StatusCode.ok)
                .json(ClienteMapper.toResponse(result));
        } catch (error) {
            return res
                .status(StatusCode.badRequest)
                .json({ message: error?.message });
        }
    }
}
