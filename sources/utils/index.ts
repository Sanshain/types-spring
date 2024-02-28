// https://stackoverflow.com/questions/69676439/create-constant-array-type-from-an-object-type
type _KeysArray<Dict extends object, Result extends PropertyKey[] = []> = {
    [Key in keyof Dict]: Exclude<keyof Dict, Key> extends never ? [...Result, Key] : _KeysArray<Omit<Dict, Key>, [...Result, Key]>;
}[keyof Dict];
    
type KeysArray__Error<L extends number, N extends number> = `Object with too much (${N}) fields amount (expected less than ${L}) passed to KeysArray type`
/** 
 * @cat Array
 * @param { a | b | c | ... } FieldKeys
 * @attention is not recommended for objects with more than 6 keys due to the severity of calculations
 * @returns {[a, b, ...]}
 * @alt_names ArrayOfKeys|KeysAsTuple
 * @cat Object
 * @example KeysArray< {a,b,c} > = ['a', 'b', 'c']
 */
export type KeysArray<Dict extends object, L extends Enumerate<8> = 7> = ObjectLength<Dict> extends Enumerate<L> ? _KeysArray<Dict> : KeysArray__Error<L, ObjectLength<Dict>> 


/**
 * @cat Object
 * @description Extracts required keys from object
 * @param {a, b: |null, c, ...} T
 * @returns {a | c | ...}
 * @example {a?: any, b: any, c: any} => b | c
 */
export type NonNullableKey<T extends object> = {
    [P in keyof T]: null extends T[P] ? never : undefined extends T[P] ? never : P
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
export type _ParseInt<T> = T extends `${infer N extends number}` ? N : never;







/**
 * @cat Array (Tuple)
 * @param {number}
 * @description Generates fixed length array with specified type
 * @returns {[type, type, ...]}
 * @example {ConstraitArray<2, boolean> => [false, true]}
 */
export type ConstrainedArray<N extends number, T = unknown, A extends T[] = []> = A['length'] extends N ? A : ConstrainedArray<N, T, [...A, T]>









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
 * @param {object} O
 * @returns {{...T, ...O}} - like flow type spread
 * @example Merge<{a: number, b: number}, {b: string, c: string}> => {a: number, b: string, c: string}
 */
export type Merge<T extends object, O extends object, _O extends 'override' | 'union' = 'override'> = _O extends 'override'
    ? {[K in keyof T | keyof O]: K extends keyof O ? O[K] : K extends keyof T ? T[K] : never }              // Omit<T, keyof K> & K
    : _Combine_<T, O>

/**
 * @cat Object
 * @description Merges fields from unlimited amount of types like js spread or flow types spread
 * @param {[...Types]}
 * @returns {{...Types}} - like flow type spread
 * @example MergeAll<[{a: number}, {b: string}, { b: 7 }]> => {a: number, b: 7}
 */
export type MergeAll<T extends Array<object>, L extends never[] = [], Result extends {} = {}> = T['length'] extends infer N extends L['length'] 
    ? Result
    : MergeAll<T, [...L, never], Merge<Result, T[L['length']]>>  // : MergeAll<T, [...L, never], Merge<Result, keyof T[L['length']]> & T[L['length']]>
    



type _WidenType<T> = T extends string
    ? string
    : T extends number
        ? number
        : T extends boolean
            ? boolean
            : T extends null
                ? object
                : T extends undefined
                    ? unknown
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
    [K in keyof A]: _WidenType<A[K]>
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
 * @example KeysMatching<{a: 1, b: '', c: string}, string> => b | c
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





/**
 * @cat Object
 * @param {{a} | {b}}} U
 * @description convert union to intersection
 * @link https://stackoverflow.com/a/50375286
 * @returns {{a} & {b}}
 * @example IntersectUnion<{a:1} | {b:1}> => {a: 1} & {b: 1}
 */
export type IntersectUnion<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never


/**
 * @cat Object
 * @param {{a} | {b}}} U
 * @description detects whether the type is union
 * @notes {boolean is always true}
 * @link https://stackoverflow.com/a/53955431
 * @returns {boolean}
 * @example IsUnion<{a:1} | {b:1}> => true
 */
export type IsUnion<T> = [T] extends [IntersectUnion<T>] ? false : true



/**
 * @cat Object
 * @description highlights common properties
 * @link https://stackoverflow.com/questions/47375916/typescript-how-to-create-type-with-common-properties-of-two-types
 * @example Common<{ a: 1 }, { a: 2, b: 1 }> => {a: 1 | 2}
 */
export type Common<A, B> = {
    [K in keyof A & keyof B]: A[K] | B[K]
}


/**
 * @cat Object
 * @param {T} minuend
 * @param {D} subtrahend
 * @description returns an object with properties of the first type that are not present in the second
 * @return {object} - object with properties of the first type that are not present in the second
 */
export type Diff<T extends object, D extends object> = {
    [K in keyof T as K extends keyof D ? never : K]: T[K]
}





type _OptionalExceptOne<T extends object, Rest = never, Result = never> = {
    [K in keyof T]: Exclude<Rest, K> extends never  // [K] extends [keyof Rest]
        ? _OptionalExceptOne<Omit<T, K>, Rest | K, Result | Partial<Omit<T, K>> & { [k in K]: T[K] }>
        : Result
}[keyof T]

/**
 * @cat Object
 * @attention tested on more then 20 fields (on purpose to check level of deep to calculatioan)
 * @param {T} object
 * @description makes all fields are optional excepts one of them
 */
export type OptionalExceptOne<T extends object> = _OptionalExceptOne<T>



declare const __brand: unique symbol
/**
 * @protected - popular type
 * @description branded type
 */
export type ScreenType<T, B = never> = T & { readonly [__brand]?: B }



/**
 * @requires ^4.2.3
 * @cat union
 * @description Extract last or first type from union type
 * @TODO rename to {PopFrom}
 */
type FirstOrLast_<U extends unknown> = (U extends any ? (x: () => U) => void : never) extends (x: infer P) => void  // PropertyKey|object
    ? P extends () => infer Return ? Return : never
    : never;



/**
 * @cat Object
 * @requires ^4.2.3
 * @param {O} object 
 * @description counts the number of keys in an object
 * @return {number}
 * @example {a,b,c} => 3
 */
export type ObjectLength<O extends object, Res extends PropertyKey[] = [], L extends PropertyKey = FirstOrLast_<keyof O>> = [L] extends [never]
    ? Res['length']
    : ObjectLength<Omit<O, L>, [L, ...Res]>;


/**
 * @cat Object | Array
 * @param {O} object 
 * @param {*} S replaced type
 * @param {*} R new type
 * @description deep replace all fields with specified type S to type R in object O
 * @return {object}
 * @example ['', '', 5], string, 0 => [0, 0, 5]
 */
export type ReplaceTypes<O extends object, S, R> = {
    [K in keyof O]: O[K] extends object
        ? ReplaceTypes<O[K], S, R>
        : O[K] extends S ? Exclude<O[K], S> | R : O[K]
}


/** @alt `T extends [infer F, ...infer R] ? R : never` - @Altdeclined - for some reason returns `unknown` instead of pure `T` type */
type RemoveFirstFromTuple_<T extends ReadonlyArray<any> | any[]> = 
    T['length'] extends 0 ? [] :
    (((...b: T) => void) extends (a: any, ...b: infer I) => void ? I : [])  


/**
 * @cat Object
 * @param {AO} Tuple 
 * @description convert tuple of objects to overall object
 * @return {object}
 * @example [{a}, {b}, {c}] => {a, b, c}
 */
export type Join<T extends readonly object[]> = T extends [infer F, ...infer R] 
    ? F & Join<R extends object[] ? R : []> 
    : {}
// export type Join<AO extends ReadonlyArray<object>, R extends object = {}> = AO['length'] extends 0
// 	? R
// 	: Join<RemoveFirstFromTuple_<AO>, R & AO[0]>




/**
 * @cat Object
 * @param {T} object 
 * @description makes just one of the fields [is] available
 * @return {Union<object>}
 * @example {a, b} => {a, b: never} | {a: never, b} 
 */
 export type OneOf<T extends object> = {
    [K in keyof T]:  {[k in K]: T[K]} & {[k in keyof Omit<T, K>]?: never}    
  } [keyof T]


/**
* @cat Object
* @param {A} object 
* @param {B} object 
* @param {M} [__CombineMethod] - approach to apply the utility (via 'intersect' or 'union': sometimes for service work it's important)
* @description combines two objects into one with types union (like merge, but with fields union)
* @returns {{...A | ...B}} 
* @example Combine<{a: number, b: number}, {b: string, c: string}> => {a: number, b: number | string, c: string}* 
* @alternativeRealization type Combine<A extends object, B extends object> = Diff<B, A> & Diff<A, B> & Common<A, B>
* @internalCause - useless on the back of Overlap and Merge (: don't bother expirience with unnecessary types)
*/
type _Combine_<A extends object, B extends object, M extends __CombineMethod = 'union'> = M extends 'union' ? {
    [K in keyof A | keyof B]: K extends keyof A & keyof B ? (A[K] | B[K]) : K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
    // [K in keyof A | keyof B]: K extends keyof A ? A[K] : (K extends keyof B ? B[K] : never)
} : Diff<B, A> & Diff<A, B> & Common<A, B>


/**
* @cat Object
* @param {A|B|...} objects
* @param {M} [__CombineMethod] - approach to apply the utility (via 'intersect' or 'union': sometimes for service work it's important)
* @description combines objects union into one with types union. Works like Combine, but just for union
* @returns {{a: A | B, b: A | BarProp, ...}} 
* @example Overlay<{a: number, b: number}|{b: string, c: string}> => {a: number, b: number | string, c: string}
*/
export type Overlap<O extends object, __M extends __CombineMethod = 'union', R extends object = {}, U extends O = FirstOrLast_<O>> = Exclude<O, U> extends never
    ? _Combine_<R, U, __M>
    : Overlap<Exclude<O, U>, __M, _Combine_<R, U, __M>>


/**
 * @description merge intersection of objects to solid single object
 */
type _Simplify_<T extends object> = {[K in keyof T]: T[K]} & {}

/**
* @cat Object
* @param {object[]} objects
* @param {key} keyof $arg[number]
* @description reduce objects array by specidied key to object
* @returns {{a: A | B, b: A | BarProp, ...}} 
* @example ReduceBy<[{a: 'a1', b: '1'}, {a: 'a2', b: '2'}], 'a'> => {a1: {b: '1', ...}, a2: {b: '2', ...}}
*/
export type ReduceBy<T extends object[] | ReadonlyArray<object>, Key extends keyof T[number], R extends {} = {},
    O extends object = T[0]> = T['length'] extends 0
    ? _Simplify_<R>
    : ReduceBy<RemoveFirstFromTuple_<T>, Key, R & {        
        [_K in O[Key] as O[Key] extends PropertyKey ? O[Key] : never]: {
            // [K in keyof O as K extends Key ? never : K]: O[K]
            [K in keyof O]: O[K]
        }
    }>





// /**
// * @cat Object
// * @param {Union<objects>} UNION
// * @param {key} keyof $arg[number]
// * @description exclude from union all objects without specified discriminant key
// * @returns {{A | B | C | ...}} 
// * @example PickByKey<{ a: 1 } | { a: 2, bb: 2 } | { bb: 11, d: 7 }, 'a'> => { a: 1 } | { a: 2, bb: 2 }}
// */
// export type PickByKey<O extends object, key extends keyof Overlap<O, 'intersect'>, R extends object = never, U extends O = FirstOrLast_<O>>
//     = Exclude<O, U> extends never
//         ? key extends keyof U ? R | U : R        
//         : PickByKey<Exclude<O, U>, key, key extends keyof U ? R | U : R>




/// TYPES ALIASES:

export type Spread<A extends object, B extends object> = Merge<A, B>;


/// INTERNAL ADDITIONAL TYPES:

type __CombineMethod = 'intersect' | 'union';


//@see also:
// https://stackoverflow.com/questions/62084836/what-does-it-mean-for-a-type-to-distribute-over-unions


