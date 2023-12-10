{
    /**
     * @think Its great but too easy and useless
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
     * Thus, the benefit of this type is probably only to make a non-optional tuple optional, since there may be difficulties with this. 
     * But this is such a rare case that I doubt it will be much in demand from the community. Therefore, I do not see it useful to add it to the package (at least for now)
     */
}