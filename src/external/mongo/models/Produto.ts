import { CategoriaEnum, Produto } from "entities/produto";
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
        deleted: {
            type: Boolean,
            required: false,
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
        deletedAt: { type: Date, required: false },
    },
    { timestamps: true },
);

export const ProdutoModel = mongoose.model<Produto>("Produtos", ProdutoSchema);
