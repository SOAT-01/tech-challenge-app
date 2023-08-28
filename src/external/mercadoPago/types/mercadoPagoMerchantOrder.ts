import { MercadoPagoPayment } from "./mercadoPagoPayment";

type MercadoPagoMerchantOrderStatus = "opened" | "closed" | "expired";

type MercadoPagoMerchantOrderOrderStatus =
    | "payment_required"
    | "reverted"
    | "paid"
    | "partially_reverted"
    | "partially_paid"
    | "payment_in_process"
    | "undefined"
    | "expired";

export interface MercadoPagoMerchantOrder {
    id: number;
    external_reference: string;
    status: MercadoPagoMerchantOrderStatus;
    order_status: MercadoPagoMerchantOrderOrderStatus;
    cancelled: boolean;
    total_amount: number;
    paid_amount: number;
    payments: MercadoPagoPayment[];
    date_created: Date;
    last_updated: Date;
    // items: unknown;
    // preference_id: unknown;
    // shipments: unknown;
    // payouts: unknown;
    // collector: unknown;
    // marketplace: unknown;
    // payer: unknown;
    // shipping_cost: unknown;
    // refunded_amount: unknown;
    // site_id: unknown;
    // additional_info: unknown;
    // application_id: unknown;
}
