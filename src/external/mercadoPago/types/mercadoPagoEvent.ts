type MercadoPagoEventType = "payment";

type MercadoPagoEventAction = "payment.created" | "payment.updated";

export interface MercadoPagoEvent {
    id: number;
    live_mode: boolean;
    type: MercadoPagoEventType;
    date_created: Date;
    user_id: number;
    api_version: string;
    action: MercadoPagoEventAction;
    data: {
        id: number;
    };
}
