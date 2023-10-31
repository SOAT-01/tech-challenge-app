import { Item } from "entities/pedido";
import { ValidationError } from "utils/errors/validationError";

export class AssertionConcern {
    public static assertArgumentNotEmpty<T>(arg: T, message: string): void {
        if (
            arg === null ||
            arg === undefined ||
            (typeof arg === "object" && Object.keys(arg).length === 0)
        ) {
            throw new ValidationError(message);
        }
    }

    public static assertArgumentMaxLength(
        arg: string,
        max: number,
        message: string,
    ): void {
        if (arg.length > max) {
            throw new ValidationError(message);
        }
    }

    public static assertArgumentMinLength(
        arg: string,
        min: number,
        message: string,
    ): void {
        if (arg.length <= min) {
            throw new ValidationError(message);
        }
    }

    public static assertArgumentIsValid(
        arg: string,
        acceptedTypes: string[],
        message: string,
    ): void {
        if (!acceptedTypes.includes(arg)) {
            throw new ValidationError(message);
        }
    }

    public static assertArgumentIsValidEmail(
        email: string,
        message: string,
    ): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError(message);
        }
    }

    public static assertArgumentIsValidCpf(cpf: string, message: string): void {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(cpf)) {
            throw new ValidationError(message);
        }
    }

    public static assertArgumentIsObject<T>(object: T): boolean {
        return object != null && typeof object === "object";
    }

    public static assertObjectEquality<T>(object1: T, object2: T): boolean {
        const props1 = Object.getOwnPropertyNames(object1);
        const props2 = Object.getOwnPropertyNames(object2);

        if (props1.length !== props2.length) {
            return false;
        }

        for (const [index] of props1.entries()) {
            const val1 = object1[props1[index]];
            const val2 = object2[props1[index]];

            const isObjects =
                AssertionConcern.assertArgumentIsObject(val1) &&
                AssertionConcern.assertArgumentIsObject(val2);

            if (
                (isObjects &&
                    !AssertionConcern.assertObjectEquality(val1, val2)) ||
                (!isObjects && val1 !== val2)
            ) {
                return false;
            }
        }

        return true;
    }

    public static assertArgumentIsBiggerThanZero(
        arg: number,
        message: string,
    ): void {
        if (arg <= 0) {
            throw new ValidationError(message);
        }
    }

    public static assertArgumentHasQuantityAndPrice(
        arr: Item[],
        message: string,
    ): void {
        if (arr.some((item) => !item.quantidade || !item.preco)) {
            throw new Error(message);
        }
    }

    public static assertArgumentIsObjectId(id: string, message: string): void {
        const ObjectIdRegex = /^[a-f\d]{24}$/i;
        if (!ObjectIdRegex.test(id)) {
            throw new ValidationError(message);
        }
    }

    public static isUUID(value = ""): boolean {
        const UUIDRegex =
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return UUIDRegex.test(value);
    }
}
