export class AssertionConcern {
    public static assertArgumentNotEmpty<T>(arg: T, message: string): void {
        if (
            arg === null ||
            arg === undefined ||
            (typeof arg === "object" && Object.keys(arg).length === 0)
        ) {
            throw new Error(message);
        }
    }

    public static assertArgumentMaxLength(
        arg: string,
        max: number,
        message: string,
    ): void {
        if (arg.length > max) {
            throw new Error(message);
        }
    }

    public static assertArgumentMinLength(
        arg: string,
        min: number,
        message: string,
    ): void {
        if (arg.length <= min) {
            throw new Error(message);
        }
    }

    public static assertArgumentIsValid(
        arg: string,
        acceptedTypes: string[],
        message: string,
    ): void {
        if (!acceptedTypes.includes(arg)) {
            throw new Error(message);
        }
    }
}
