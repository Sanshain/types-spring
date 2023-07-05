/// types-spring

const ar = new Array(2)                                 // number[] => [number, number] - set fix length array

// too narrow type


/// ts

let rr = Object.defineProperty({d: 4}, '1', {           // defined prop name should be optional field inside origin object type. else - error? real?
    value: true
})

// => declined because of unpossinility to redefine default beh.
// => to ts