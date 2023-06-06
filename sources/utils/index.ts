// https://stackoverflow.com/questions/69676439/create-constant-array-type-from-an-object-type
/**
 * @cat Array
 * @param { a | b | c | ... } FieldKeys
 * @attention is not recommended for objects with more than 10 keys due to the severity of calculations
 * @returns {[a, b, ...]}
 * @example KeysArray< a|b|c > = ['a', 'b', 'c']
 * @cat Object
 * @example KeysArray< keyof {a,b,c} > = ['a', 'b', 'c']
 */
export type KeysArray<FieldKeys extends string, Result extends string[] = []> = {
    [Key in FieldKeys]: Exclude<FieldKeys, Key> extends never ? [...Result, Key] : KeysArray<Exclude<FieldKeys, Key>, [...Result, Key]>;    
}[FieldKeys];


/**
 * @cat Object
 * @description Extracts required keys from object
 * @param {a, b, c?, ...} T
 * @returns {a | b | ...}
 * @example {a?: any, b: any, c: any} => b | c
 */
export type RequiredKeys<T extends object> = {
    [P in keyof T]: null extends T[P] ? never : P;
}[keyof T];



/**
 * @cat Object
 * @description Omit nullable types from object
 * @param {a, b, c?, ...} T
 * @returns {{a, b, ...}
 * @example {a?: any, b: any, c: any} => {b: any, c: any}
 */
export type OmitNullable<T> = {
    [K in keyof T as null extends T[K] ? never : K]: T[K];
}




/**
 * @cat primitives
 * @requires ^4.7.4
 * @description converts number string to number (usefull inside another types)
 * @param {`${number}`}
 * @returns {number}
 * @example type N = ParseInt<'7'>
 */
export type ParseInt<T> = T extends `${infer N extends number}` ? N : never;







/**
 * @cat Array (Tuple)
 * @param {number}
 * @description Generates fixed length array with specified type
 * @returns {[type, type, ...]}
 * @example {ConstraitArray<2, boolean> => [false, true]}
 */
export type ConstraitArray<N extends number, T = unknown, A extends T[] = []> = A['length'] extends N ? A : ConstraitArray<N, T, [...A, T]>









/**
 * @cat Array (Tuple)
 * @param {any[]}
 * @description Extract indexes from tuple like keyof object
 * @returns {0 | 1 | 2 | ...}
 * @example Indexes<['a', 'b', 'a']> => 0 | 1 | 2
 */
export type Indexes<T extends readonly unknown[]> = Exclude<Partial<T>["length"], T["length"]>







/**
 * @cat Array (Tuple)
 * @param {number} L 
 * @description Generates a tuple with the specified length as a sequence of numbers 
 * @returns [0, 1, 2, ...]
 * @example Sequence<3> => [0, 1, 2]
 */
export type Sequence<L extends number, A extends number[] = []> = A['length'] extends L ? A : Sequence<L, [...A, A['length']]>






// /**
//  * @deprecated reminder for alternative way of the Merge<>
//  */
// type Merge<A, B> = {
//     // [K in keyof A | keyof B]: K extends keyof A & keyof B ? (A[K] | B[K]) : K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
//     [K in keyof A | keyof B]: K extends keyof A ? A[K] : (K extends keyof B ? B[K] : never)
// };

/**
 * @cat Object
 * @description like flow type spread
 * @param {object} T
 * @param {object} K
 * @returns {{...T, ...K}} - like flow type spread
 * @example Merge<{a: number, b: number}, {b: string, c: string}> => {a: number, b: string, c: string}
 */
export type Merge<T extends object, K extends object> = Omit<T, keyof K> & K;



/**
 * @cat Object
 * @description Merges fields from unlimited amount of types like js spread or flow types spread
 * @param {[...Types]}
 * @returns {{...Types}} - like flow type spread
 * @example MergeAll<[{a: any}, {b: any}, { b: 7 }]> => {a: any, b: 7}
 */
export type MergeAll<T extends Array<object>, L extends never[] = [], Result extends {} = {}> = T['length'] extends infer N extends L['length'] 
    ? Result
    : MergeAll<T, [...L, never], Merge<Result, T[L['length']]>>  // : MergeAll<T, [...L, never], Merge<Result, keyof T[L['length']]> & T[L['length']]>
    





type WidenType<T> = T extends string
    ? string
    : T extends number
        ? number
        : T extends boolean
            ? boolean
            : T extends null
                ? object
                : T extends undefined
                    ? any
                    : T
                    
// export type WideArray<A extends ReadonlyArray<unknown>, R extends unknown[] = []> = A['length'] extends R['length']
//     ? R
//     : WideArray<A, [...R, WidenLiteral<A[R['length']]>]>;


/**
 * @cat Array (Tuple)
 * @description Converts types of the tuple to corresponding common type
 * @param {[Tuple<type>]}
 * @returns {[Tuple<widentype>]}
 * @example [1, 2, 3] => [number, number, number]
 */
export type WideArray<A extends ReadonlyArray<unknown>> = {
    // [K in keyof A]: A[K] extends string ? string : (A[K] extends number ? number : A[K])
    [K in keyof A]: WidenType<A[K]>
}  



/**
 * @cat Array (Tuple)
 * @description Converts types of the tuple to specified type
 * @param {[Tuple<type>]} A
 * @param {type} T
 * @returns {[Tuple<T>]}
 * @example ConvertTupleType<[1, 2, 3], string> => [string, string, string]
 */
export type ConvertTupleType<A extends ReadonlyArray<unknown>, T> = {
    [K in keyof A]: T
}







/**
 * @cat union
 * @atention not recomended for sequences over more then one hundren elements
 * @link https://stackoverflow.com/a/70307091/9659573
 * @param {number} N
 * @description Generates union keys with the specified length as a sequence of numbers 
 * @returns {0 | 1 | 2 | ...}
 * @example Enumerate<3> => 0 | 1 | 2
 */
export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>



export type Ranged<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>






/**
 * @cat Object
 * @alternative type KeysWithValsOfType<T,V> = keyof { [ P in keyof T as T[P] extends V ? P : never ] : P };    
 * @link https://stackoverflow.com/a/66144780/9659573
 * @param {Record<S extends string, unknown>} T
 * @param {unknown} V
 * @description Extract keys with specified value type from object T
 * @returns {key1 | key2 | ...}
 * @example KeysMatching<{a: 1, b: ''}, string> => b
 */
export type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];





/**
 * @cat Array
 * @param {(type|type1|type2|...)[]} A
 * @param {type} V
 * @description Excludes from array all types except V
 * @returns {(type)[]}
 * @example ArrayFilter<Array<string|number>, number> => Array<number>
 */
export type ArrayFilter<A extends Array<unknown>, V> = Array<A[number] extends V ? never : V>





/**
 * @cat Object
 * @param {{a: A, b: A}} T
 * @param {string} F
 * @description maps object to object
 * @returns {{a: A[F], b: A[F]}}
 * @example MapType<{a: {a: string}}, "a"> => {a: string}
 */
export type MapType<T extends Record<string, Record<F, unknown>>, F extends string> = {
    [K in keyof T]: T[K][F]
}



/**
 * @cat Array & Tuple
 * @param {[A,A]} T
 * @param {string} F
 * @description map array item (object) to reduced object from specified key
 * @returns {[A[F], A[F]]}
 * @example MapType<[{a: string}], "a"> => [string]
 */
export type MapArray<T extends Record<F, unknown>[] | ReadonlyArray<Record<F, unknown>>, F extends string> = {
    [K in keyof T]: T[K][F]
}



