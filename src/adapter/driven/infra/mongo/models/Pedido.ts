import { Pedido, Item } from "@domain/entities/pedido";
import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema<Item>({
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produto",
        required: true,
    },
    quantidade: { type: Number, required: true },
});

const PedidoSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },
        preco: {
            type: Number,
            required: true,
        },
        // cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
        cliente: {
            type: String,
            required: true,
        },
        itens: [ItemSchema],
    },
    { timestamps: true },
);

export default mongoose.model<Pedido>("Pedidos", PedidoSchema);
