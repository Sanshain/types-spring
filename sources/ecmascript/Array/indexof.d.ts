type WidenLiteral<T> = T extends string ? string : (T extends number ? number : T);
type Indexes<T extends readonly unknown[]> = Exclude<Partial<T>["length"], T["length"]>;

interface ReadonlyArray<T> {
    // indexOf<K extends true | 'any' = true>(searchElement: K extends true ? T : K extends 'any' ? WidenLiteral<T> : never, fromIndex?: number): number
    // indexOf<K extends never | unknown = never>(this: ReadonlyArray<T>, searchElement: K extends never ? T : K extends WidenLiteral<T> ? WidenLiteral<T> : never, fromIndex?: number): number
    indexOf<K extends never | unknown = never>(this: ReadonlyArray<T>, searchElement: K extends never ? T : K extends WidenLiteral<T> ? WidenLiteral<T> : never, fromIndex?: number): number
}

// var index = (a as [number, number, number]).indexOf(44)