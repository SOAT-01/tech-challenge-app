import { Produto, CategoriaEnum } from "@domain/interfaces/produto.interface";
import mongoose from "mongoose";

export interface ProdutoModel extends mongoose.Document, Omit<Produto, "id"> {}

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

export default mongoose.model<ProdutoModel>("Produtos", ProdutoSchema);
