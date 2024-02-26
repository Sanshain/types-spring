/// Lifehack book:


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