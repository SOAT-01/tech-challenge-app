import { AssertionConcern } from "../base/assertionConcern";
import { ValueObject } from "../base/valueObject";

interface EmailProperties {
    address: string;
}

export class Email extends ValueObject<EmailProperties> {
    private constructor(props: EmailProperties) {
        super(props);
    }

    get value(): string {
        return this.props.address;
    }

    public static create(value: string): Email {
        AssertionConcern.assertArgumentIsValidEmail(
            value,
            "Incorrect email format",
        );
        return new Email({ address: value });
    }
}
