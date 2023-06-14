import { AssertionConcern } from "../base/assertionConcern";
import { Entity } from "../base/entity.interface";
import { Cpf } from "../valueObjects/cpf";

export class User implements Entity {
    id: string;
    name: string;
    age: number;
    cpf: Cpf;

    constructor(id: string, name: string, age: number, cpf: Cpf) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.cpf = cpf;

        this.validateEntity();
    }

    public validateEntity(): void {
        AssertionConcern.assertArgumentNotEmpty(this.name, "Name is required");
        AssertionConcern.assertArgumentNotEmpty(this.name, "Age is required");
    }
}
