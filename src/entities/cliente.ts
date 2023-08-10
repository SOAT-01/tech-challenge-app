import { Email, Cpf } from "valueObjects";

import { Entity } from "../interfaces/entity.interface";
import { AssertionConcern } from "utils/assertionConcern";

interface ClienteProperties
    extends Omit<
        Cliente,
        "id" | "createdAt" | "updatedAt" | "deletedAt" | "validateEntity"
    > {
    id?: string;
}

export class Cliente implements Entity {
    id: string;
    nome: string;
    email: Email;
    cpf: Cpf;

    constructor(fields: ClienteProperties) {
        this.id = fields?.id;
        this.nome = fields.nome;
        this.email = fields.email;
        this.cpf = fields.cpf;

        this.validateEntity();
    }

    public validateEntity(): void {
        AssertionConcern.assertArgumentNotEmpty(this.nome, "Nome is required");
        AssertionConcern.assertArgumentNotEmpty(
            this.email,
            "Email is required",
        );
        AssertionConcern.assertArgumentNotEmpty(this.cpf, "Cpf is required");
    }
}
