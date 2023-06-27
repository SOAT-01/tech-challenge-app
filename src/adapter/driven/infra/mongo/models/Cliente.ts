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
            unique: true,
            dropDups: true,
        },
        cpf: {
            type: String,
            required: true,
            unique: true,
            dropDups: true,
        },
        deleted: {
            type: Boolean,
            required: false,
        },
        deletedAt: { type: Date, required: false },
    },
    { timestamps: true },
);

export const ClienteModel = mongoose.model("Clientes", ClienteSchema);
