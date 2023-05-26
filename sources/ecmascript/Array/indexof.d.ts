
type WidenLiteral<T> = T extends string ? string : (T extends number ? number : T);

interface ReadonlyArray<T> {
    indexOf<K extends true | 'any' = true>(searchElement: K extends true ? T : K extends 'any' ? WidenLiteral<T> : never, fromIndex?: number): number;
    // indexOf<K extends 'narrowed' | never = 'narrowed'>(searchElement: WidenLiteral<T>, fromIndex?: number): number;    
}