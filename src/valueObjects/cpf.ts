import { ValueObject } from "interfaces/valueObject";
import { AssertionConcern } from "utils/assertionConcern";

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
        AssertionConcern.assertArgumentNotEmpty(value, "Cpf is required");
        AssertionConcern.assertArgumentIsValidCpf(
            value,
            "Incorrect cpf format, ex: 123.456.789-00",
        );

        return new Cpf({ document: value });
    }
}
