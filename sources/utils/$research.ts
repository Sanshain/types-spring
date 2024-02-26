/// Lifehack book:

import { Overlap, Common, Diff } from ".";



{
    /**
     * @think Its great but too easy and useless
     * @declineReason - too easy and useless
     * 
     * @cat Array (Tuple)
     * @link https://gist.github.com/khalidx/6a4f949346df30a655b02207383b566a 
     * @also https://stackoverflow.com/a/64034671/9659573
     * @param {[type,type1,type2,...]} A
     * @param {type} V
     * @description Excludes from tuple (!) specified type
     * @returns {[type,type1,type2,...]}
     * @example Filter<[string, number], number> => [string]
     */
    type ExcludeFrom<A extends ReadonlyArray<unknown>, V> = Exclude<A[number], V>[]

    type F = ExcludeFrom<Array<string | number>, number>
}


{    
    /// Optional Tuple

    type RemoveFirstFromTuple<T extends any[]> =
        T['length'] extends 0 ? undefined :
        (((...b: T) => void) extends (a: any, ...b: infer I) => void ? I : [])
    
    type Tail<T extends any[]> = T extends [infer A, ...infer R] ? R : never;
    

    type OptionalTuple<T extends any[], A extends unknown[] = [], R extends unknown[] = never> = T['length'] extends 0
        ? R | A
        : OptionalTuple<RemoveFirstFromTuple<T> extends any[] ? RemoveFirstFromTuple<T> : [], [...A, T[0]], A['length'] extends 0 ? never : (A | R)>

    {
        type A = [1, 2, 3]
        type POP = OptionalTuple<A>
        let t1: POP = [1]
        let t2: POP = [1, 2]
        let t3: POP = [1, 2, 3]    
    }
    
    // declined now because the same behavior could got in fact OUT OF THE BOX (!) by one line:
        
    {
        type F = (a: 1, b?: 2, c?: 3) => void
        type POP1 = Parameters<F>
        let t1: POP1 = [1]
        let t2: POP1 = [1, 2]
        let t3: POP1 = [1, 2, 3]

        // type OPtionalTuple
    }

    // or

    {
        type A = [a: 1, b?: 2, c?: 3]
    }

    /**
     * @declineReason :
     *      Thus, the benefit of this type is probably only to make a non-optional tuple optional, since there may be difficulties with this. 
     *      But this is such a rare case that I doubt it will be much in demand from the community. Therefore, I do not see it useful to add it to the package (at least for now)
     */
}



{
    type ABC = 'A' | 'B' | 'C'
    type Num = '1' | '2' | '3'

    /**
     * @description like OptionalExceptOne, but for unions
     * @thoughts like OptionalExceptOne, but for unions
     */
    type OptionalExceptOneOf<TT extends PropertyKey, EE = string, Result = never> = {
        [K in TT]: Exclude<TT, K> extends never
        ? Result  // | { [k in K]: string } & { [k in TT & keyof Result]?: string }
        : OptionalExceptOneOf<Exclude<TT, K>, EE, Result | { [k in K]: EE } & { [k in TT & keyof Result]?: EE }>
    }[TT]

    type II = OptionalExceptOneOf<ABC, number> & OptionalExceptOneOf<Num>
    let t: II = {
        A: 1,
        1: ''
    }

    /**
     * @declineReason - it seems too similar to OptionalExceptOne and too useless for accompared with it
     */    
}





/// GroupBy

{
    type RemoveFirstFromTuple_<T extends ReadonlyArray<any> | any[]> =
        T['length'] extends 0 ? [] :
        (((...b: T) => void) extends (a: any, ...b: infer I) => void ? I : [])

    /**
    * @cat Object
    * @param {object[]} objects
    * @param {key} keyof $arg[number]
    * @description combines objects union into one with types union. Works like Combine, but just for union
    * @returns {{a: A | B, b: A | BarProp, ...}} 
    * @example GroupBy<[{a: 'a1', b: '1'}, {a: 'a2', b: '2'}], 'a'> => [{a1: {b: '1'}}, {a2: {b: '2'}}]
    */
    type GroupBy<T extends object[], Key extends keyof T[number], R extends object[] = [], O extends object = T[0], Kyes = keyof O> = T['length'] extends 0
        ? R
        : GroupBy<RemoveFirstFromTuple_<T>, Key, [...R, {
            [_K in O[Key]as O[Key] extends PropertyKey ? O[Key] : never]: {
                [K in keyof O as K extends Key ? never : K]: O[K]
            }
        }]>
    
    type Ar = [{ a: 1, b: string }, { a: 2, c: boolean }];
    type R = GroupBy<Ar, 'a'> 
    
    /**
     * @declineReason - too similar to ReduceBy. To be honest it's it.
     */
}



{
    /**
     * @declineReason - too easy to implement it
     * @description - add autohinting to optional union string
     */
    type SmartString<keys extends string> = keys | string & {}
    let a: SmartString<'aaa' | 'abb'> = 'aaa'
    let a1: SmartString<'aaa' | 'abb'> = 'aaa1'
}



{
    /// Common keys: 
    type UU = { a: 1 } | { a: 2, b: 2 }
    type CommonKeys<T> = keyof T; // => 'a'
    /**
     * @declineReason - too easy to implement it
     */
}



{
    ///@names: PickByKey (DiscrimeBy|ExcludeExceptWithKeys)

    
    type FirstOrLast_<U extends object> = (U extends any ? (x: () => U) => void : never) extends (x: infer P) => void  // PropertyKey|object
        ? P extends () => infer Return ? Return : never
        : never;

    /**
     * @altname DiscrimeBy
     */
    type PickByKey<O extends object, key extends keyof Overlap<O, 'intersect'>, R extends object = never, U extends O = FirstOrLast_<O>>
        = Exclude<O, U> extends never
            ? key extends keyof U ? R | U : R 
            : PickByKey<Exclude<O, U>, key, key extends keyof U ? R | U : R>
    
    // https://www.typescriptlang.org/play?ssl=40&ssc=43&pln=38&pc=1#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

    type UU = { a: 1 } | { a: 2, bb: 2 } | { bb: 11, d: 7 } | { bb1: 11, d1: 7 }
    type D = PickByKey<UU, 'bb'>  
    let d: D = {
        a: 2,
        bb: 2
    }

    /**
     * @think - I think useful, but there is some error of infinity deep. At the same time in sandbox it work fine
     * @trouble - fixed by 'intersect' option
     * 
     */
    
    type U = { a: 1 } | { a: 2, bb: 2 } | { bb: 11, d: 7 }

    function func(u: U) {
        if ('a' in u) {
            let a: number = u.a;
            //@ts-expect-error
            let v: number = u.bb;
        }
    }    

    /**
     * @think - the same behavior like guard => useless
     * 
     */

}