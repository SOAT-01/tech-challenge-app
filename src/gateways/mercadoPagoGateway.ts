import { serverConfig } from "config";
import { PagamentoEventMapper } from "adapters/mappers";
import { PagamentoEvent } from "entities/pagamentoEvent";
import { Pedido } from "entities/pedido";
import { MercadoPagoApi, MercadoPagoMerchantOrder } from "external/mercadoPago";
import { PagamentoGateway } from "interfaces/gateways";

// ! WORK IN PROGRESS
export class MercadoPagoGateway implements PagamentoGateway {
    constructor(private readonly mercadoPagoApi: MercadoPagoApi) {}

    private readonly mercadoPagoUserId = serverConfig.mercadoPago.userId;
    private readonly mercadoPagoPOS = serverConfig.mercadoPago.pos;

    async getPagamentoEvent(mercadoPagoId: string): Promise<PagamentoEvent> {
        const { data } =
            await this.mercadoPagoApi.get<MercadoPagoMerchantOrder>(
                `/merchant_orders/${mercadoPagoId}`,
            );

        return PagamentoEventMapper.toDomain({
            pedidoId: data.external_reference,
            tipo: this.getTipo(data),
        });
    }

    async createOrder(pedido: Pedido): Promise<string> {
        const { data } = await this.mercadoPagoApi.post<{ qr_data: string }>(
            `/instore/orders/qr/seller/collectors/${this.mercadoPagoUserId}/pos/${this.mercadoPagoPOS}/qrs`,
            {
                external_reference: pedido.id,
                title: pedido.id,
                description: pedido.id,
                total_amount: pedido.valorTotal,
                items: [
                    {
                        title: "PRODUTO 1",
                        unit_price: 50,
                        quantity: 1,
                        unit_measure: "unit",
                        total_amount: 50,
                    },
                ],
            },
        );

        return data.qr_data;
    }

    private getTipo({
        status,
        payments,
    }: MercadoPagoMerchantOrder): PagamentoEvent["tipo"] {
        const [lastPayment] = payments.sort(
            (a, b) =>
                new Date(b.date_created).getTime() -
                new Date(a.date_created).getTime(),
        );

        if (status === "closed" && lastPayment.status !== "approved") {
            return "recusado";
        }

        if (status === "closed" && lastPayment.status === "approved") {
            return "aprovado";
        }

        return "pendente";
    }
}
