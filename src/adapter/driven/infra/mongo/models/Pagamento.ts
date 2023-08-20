import mongoose from "mongoose";
import { StatusPagamentoEnum } from "@domain/entities/pagamento";

const PagamentoSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: Object.values(StatusPagamentoEnum),
            default: StatusPagamentoEnum.Processando,
            required: true,
        },
    },
    { timestamps: true },
);

export const PagamentoModel = mongoose.model("Pagamentos", PagamentoSchema);
