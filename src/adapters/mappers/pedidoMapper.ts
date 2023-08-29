import { Cliente } from "entities/cliente";
import { Pedido } from "entities/pedido";
import { PedidoDTO, ClienteDTO } from "useCases";
import { Cpf, Email } from "valueObjects";

export class PedidoMapper {
    public static toDomain(dto: PedidoDTO, cliente?: ClienteDTO): Pedido {
        const hasCliente = cliente && cliente.id;

        return new Pedido({
            id: dto.id,
            status: dto.status,
            pagamento: dto.pagamento,
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
            pagamento: pedido.pagamento,
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
