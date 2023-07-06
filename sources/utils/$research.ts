{
    /**
     * @think Its great but too easy and useless
     * 
     * @cat Array (Tuple)
     * @link https://gist.github.com/khalidx/6a4f949346df30a655b02207383b566a
     * @param {[type,type1,type2,...]} A
     * @param {type} V
     * @description Excludes from tuple (!) specified type
     * @returns {[type,type1,type2,...]}
     * @example Filter<[string, number], number> => [string]
     */    
    type ExcludeFrom<A extends ReadonlyArray<unknown>, V> = Exclude<A[number], V>[]
    
    type F = ExcludeFrom<Array<string|number>, number>
}    
