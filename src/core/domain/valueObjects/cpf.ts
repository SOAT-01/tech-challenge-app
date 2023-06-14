import { ValueObject } from "../base/valueObject";

export class Cpf extends ValueObject {
    public document: string;

    constructor(document: string) {
        super();
        this.document = document;
    }
}
