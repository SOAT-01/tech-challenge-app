import { CategoriaEnum, Produto } from "@domain/entities/produto";
import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        preco: {
            type: Number,
            required: true,
        },
        categoria: {
            type: String,
            enum: Object.values(CategoriaEnum),
            required: true,
        },
        descricao: {
            type: String,
            required: true,
        },
        imagem: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model<Produto>("Produtos", ProdutoSchema);
