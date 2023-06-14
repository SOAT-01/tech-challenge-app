export class AssertionConcern {
    public static assertArgumentNotEmpty<T>(arg: T, message: string): void {
        if (arg === null || arg === undefined) {
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
}
