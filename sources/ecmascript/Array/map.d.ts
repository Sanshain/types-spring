type ConstraitArray<N extends number, T = unknown, A extends T[] = []> = A['length'] extends N ? A : ConstraitArray<N, T, [...A, T]>

interface ReadonlyArray<T> {    
    readonly length: number,
    map<U>(callbackfn: (this: readonly T[], value: T, index: number, array: readonly T[]) => U, thisArg?: any): ConstraitArray<this['length'], U>;
}