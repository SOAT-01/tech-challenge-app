import { Pedido, Item, StatusPedidoEnum } from "@domain/entities/pedido";
import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema<Item>({
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produto",
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
            required: true,
        },
        // cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
        cliente: {
            type: String,
            required: true,
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

export default mongoose.model<Pedido>("Pedidos", PedidoSchema);
