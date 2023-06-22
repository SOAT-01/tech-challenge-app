import { Pedido, StatusPedidoEnum } from "@domain/entities/pedido";
import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema(
    {
      cliente: {
        type: String,
        required: false,
      },
      itens: [{
        produto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Produto",
          required: true,
        },
        quantidade: { type: Number, required: true, min: 1 },
      }],
      status: {
        type: String,
        enum: Object.values(StatusPedidoEnum),
        required: true,
      },
      valorTotal: {
          type: Number,
          required: true,
      },
      observacoes: {
        type: String,
        required: false
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