export abstract class ValueObject {
    protected static isEqual(left: ValueObject, right: ValueObject): boolean {
        return left === right;
    }
}
