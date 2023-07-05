import { Pedido, Item, StatusPedidoEnum } from "@domain/entities/pedido";
import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema<Item>({
    produtoId: {
        type: String,
        required: true,
    },
    quantidade: { type: Number, required: true, min: 1 },
});

const PedidoSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: Object.values(StatusPedidoEnum),
            required: true,
        },
        valorTotal: {
            type: Number,
            required: false,
        },
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clientes",
            required: false,
        },
        itens: [ItemSchema],
        observacoes: {
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

export const PedidoModel = mongoose.model<Pedido>("Pedidos", PedidoSchema);
