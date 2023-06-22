import { Cliente } from "@domain/entities/cliente";
import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        cpf: {
            type: String,
            required: false,
        },
        deleted: {
            type: Boolean,
            required: false,
        },
        deletedAt: { type: Date, required: false },
    },
    { timestamps: true },
);

export const ClienteModel = mongoose.model<Cliente>("Clientes", ClienteSchema);
