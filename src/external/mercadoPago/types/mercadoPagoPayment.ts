type MercadoPagoPaymentStatus =
    | "pending"
    | "approved"
    | "authorized"
    | "in_process"
    | "in_mediation"
    | "rejected"
    | "cancelled"
    | "refunded"
    | "charged_back";

type MercadoPagoPaymentStatusDetail =
    | "accredited"
    | "pending_contingency"
    | "pending_review_manual"
    | "cc_rejected_bad_filled_date"
    | "cc_rejected_bad_filled_other"
    | "cc_rejected_bad_filled_security_code"
    | "cc_rejected_blacklist"
    | "cc_rejected_call_for_authorize"
    | "cc_rejected_card_disabled"
    | "cc_rejected_duplicated_payment"
    | "cc_rejected_high_risk"
    | "cc_rejected_insufficient_amount"
    | "cc_rejected_invalid_installments"
    | "cc_rejected_max_attempts"
    | "cc_rejected_other_reason";

export interface MercadoPagoPayment {
    id: number;
    transaction_amount: number;
    total_paid_amount: number;
    currency_id: "BRL";
    status: MercadoPagoPaymentStatus;
    status_detail: MercadoPagoPaymentStatusDetail;
    date_created: Date;
    date_approved: Date;
    last_modified: Date;
    // shipping_cost: unknown;
    // amount_refunded: unknown;
    // date_last_updated: unknown;
    // money_release_date: unknown;
    // payment_method_id: unknown;
    // payment_type_id: unknown;
    // description: unknown;
    // collector_id: unknown;
    // payer?: unknown;
    // transaction_amount_refunded: unknown;
    // coupon_amount: unknown;
    // transaction_details: unknown;
    // installments: unknown;
}
