/// How necessary is this feature?

interface ObjectConstructor {
    // getPrototypeOf(o: object): object | null;
    setPrototypeOf<T extends object, P extends object | null>(o: T, proto: P): P extends object ? Merge<P, T> : T;    


    // setPrototypeOf<T extends object, P extends object | null>(o: T, proto: P): P extends object ? T & P : T;
}

