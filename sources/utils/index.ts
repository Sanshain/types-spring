// https://stackoverflow.com/questions/69676439/create-constant-array-type-from-an-object-type
/**
 * @attention is not recommended for objects with more than 10 keys due to the severity of calculations
 */
export type FieldsArray<FieldKeys extends string, Result extends string[] = []> = {
    [Key in FieldKeys]: Exclude<FieldKeys, Key> extends never ? [...Result, Key] : FieldsArray<Exclude<FieldKeys, Key>, [...Result, Key]>;    
}[FieldKeys];


// type ObjType = {
//     countryCode: string;
//     currency: string;
//     otherFields: string;
// };

// type AllowedFields = FieldsArray<keyof ObjType>;


// const allowedFields: AllowedFields = ["currency", "countryCode", "otherFields"];


// // How to create 'SomeType'?
// const foo: AllowedFields = ["countryCode"]; // Should throw error because there are missing fields

// const bar: AllowedFields = ["extraField"];






export type RequiredKeys<T extends object> = {
    [P in keyof T]: null extends T[P] ? never : P;
}[keyof T];


// type User = {
//     name: string;
//     name1: string;
//     email: string | null;
//     email1: string | null;
// };

// type NonNullableUserPropertyKeys = RequiredKeys<User>;

// let a: NonNullableUserPropertyKeys = 'name'




export type OmitNullable<T> = {
    [K in keyof T as null extends T[K] ? never : K]: T[K];
}


// type User = {
//     name: string;
//     email: string | null;
// };

// type NonNullableUserPropertyKeys = OmitNullable<User>;

// let a: NonNullableUserPropertyKeys = {
//     name: 'name',
// }


/**
 * @requires ^4.7.4
 */
export type ParseInt<T> = T extends `${infer N extends number}` ? N : never;








export type ConstraitArray<N extends number, T = unknown, A extends T[] = []> = A['length'] extends N ? A : ConstraitArray<N, T, [...A, T]>

export let names: ConstraitArray<2, boolean> = [false, true]





export const testArray = [
    "test1",
    "test2",
    "test3",
    "test4"
] as const;
// // Создадим конструктор для типов


export type TupleIndeces<T extends readonly unknown[]> = Exclude<Partial<T>["length"], T["length"]>


// Создаем тип
// type ArrayIndex = TupleIndeces<typeof testArray>;





// const a = {
//     a: 1,
//     b: 2
// } as const

// let e: TupleLength<keyof typeof a>
// let r: FieldsArray<keyof typeof a>['length']; //  = ['b', 'a']
// let r1: FieldsArray<keyof typeof a> = ['b', 'a']


export type Sequence<L extends number, A extends number[] = []> = A['length'] extends L ? A : Sequence<L, [...A, A['length']]>

// let re: Sequence<3>[number] = 1 // 0 | 1
// let rev: Sequence<FieldsArray<keyof typeof a>['length']>[number] = 1





// type Merge<A, B> = {
//     // [K in keyof A | keyof B]: K extends keyof A & keyof B ? (A[K] | B[K]) : K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
//     [K in keyof A | keyof B]: K extends keyof A ? A[K] : (K extends keyof B ? B[K] : never)
// };

/**
 * @description like flow type spread
 */
export type Merge<T extends {}, K extends {}> = Omit<T, keyof K> & K;
export type MergeAll<T extends Array<object>, L extends never[] = [], Result extends {} = {}> = T['length'] extends infer N extends L['length'] 
    ? Result
    : MergeAll<T, [...L, never], Merge<Result, T[L['length']]>>
    // : MergeAll<T, [...L, never], Merge<Result, keyof T[L['length']]> & T[L['length']]>



// const merge = <A extends object[]>(...a: [...A]) => {
//     return Object.assign({}, ...a) as UnionToIntersection<A[number]>;
// };


// type A = {
//     a: string,
//     b: number
// }
// type B = {
//     b: string,
//     c: number
// }

// // type C = Merge<A, B>
// type C = MergeAll<[A, B, {d: 7}]>

// let a: A = {a: '', b: 7}
// let b: B = {c: 1, b: '7'}

// let cc = Object.assign(a, b, {}, {})
// // let cc = {...a, ...b, ...{}, ...{}, ...{f: 7}}

// let c: C;



// type WidenLiteral<T> = T extends string ? string : (T extends number ? number : T);
// export type WideArray<A extends ReadonlyArray<unknown>, R extends unknown[] = []> = A['length'] extends R['length']
//     ? R
//     : WideArray<A, [...R, WidenLiteral<A[R['length']]>]>;


export type WideArray<A extends ReadonlyArray<unknown>> = {
    [K in keyof A]: A[K] extends string ? string : (A[K] extends number ? number : A[K]) 
}  


// const arr = [1, 2, 3] as const
// type R = WideArray<typeof arr>
// let r: R;



// function name(a:number) {
//     // const r = (arr as [number, number, number]).indexOf(44)

//     if (~arr.indexOf<any>(a)) {
        
//     }
// }

// const validate = (input: unknown) => {
//     if (Array.isArray(input)) {
//         console.log(input); // unknown[]
//     }
// };

