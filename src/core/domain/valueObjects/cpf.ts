import { AssertionConcern } from "@domain/base/assertionConcern";
import { ValueObject } from "../base/valueObject";

interface CpfProperties {
    document: string;
}

export class Cpf extends ValueObject<CpfProperties> {
    private constructor(props: CpfProperties) {
        super(props);
    }

    get value(): string {
        return this.props.document;
    }

    public static create(value: string): Cpf {
        AssertionConcern.assertArgumentIsValidCpf(
            value,
            "Incorrect cpf format",
        );
        return new Cpf({ document: value });
    }
}
