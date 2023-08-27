import { AssertionConcern } from "utils/assertionConcern";

interface ValueObjectProps {
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
    public readonly props: T;

    constructor(props: T) {
        this.props = Object.freeze(props);
    }

    public equals(valueObject?: ValueObjectProps): boolean {
        if (valueObject === null || valueObject === undefined) {
            return false;
        }

        if (valueObject.props === undefined) {
            return false;
        }

        return AssertionConcern.assertObjectEquality(this.props, valueObject);
    }
}
