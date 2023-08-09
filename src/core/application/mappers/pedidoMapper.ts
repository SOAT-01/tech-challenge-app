import { Cliente } from "entities/cliente";
import { Pedido } from "@domain/entities/pedido";
import { Cpf, Email } from "@domain/valueObjects";
import { ClienteDTO } from "useCases/cliente/dto";
import { PedidoDTO } from "useCases/pedido/dto";

export class PedidoMapper {
    public static toDomain(dto: PedidoDTO, cliente?: ClienteDTO): Pedido {
        const hasCliente = cliente && cliente.id;

        return new Pedido({
            id: dto.id,
            status: dto.status,
            valorTotal: dto.valorTotal,
            observacoes: dto.observacoes,
            itens: dto.itens,
            ...(hasCliente && {
                cliente: new Cliente({
                    id: cliente.id,
                    nome: cliente.nome,
                    cpf: Cpf.create(cliente.cpf),
                    email: Email.create(cliente.email),
                }),
            }),
        });
    }

    public static toDTO(pedido: Pedido): PedidoDTO {
        const { cliente = undefined } = pedido;

        return {
            id: pedido.id,
            status: pedido.status,
            valorTotal: pedido.valorTotal,
            itens: pedido.itens,
            observacoes: pedido.observacoes,
            ...(cliente && {
                cliente: {
                    id: cliente.id,
                    nome: cliente.nome,
                    email: cliente.email.value,
                    cpf: cliente.cpf.value,
                },
            }),
        };
    }
}
