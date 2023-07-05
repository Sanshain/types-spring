
// type ConstrainArray<N extends number, T = unknown, A extends T[] = []> = A['length'] extends N ? A : ConstrainArray<N, T, [...A, T]>

// interface ArrayConstructor {

//     new <T, N extends number>(arrayLength?: N): ConstrainArray<N, T | undefined>;    
// }


// {    
//     let rrr = new Array<string, 2>()
//     rrr[0]?.replace('', '')
// }