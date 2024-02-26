/// types-spring

const ar = new Array(2)                                 // number[] => [number, number] - set fix length array

// too narrow type


/// 2

{
    let rr = Object.defineProperty({ d: 4 }, '1', {           // defined prop name should be optional field inside origin object type. else - error? real?
        value: true
    })

    /**
     * @declined declined because of unpossinility to redefine default beh.
     *  */     
}



/// 3
{
    /**
     * @declined stiil because of the type is exists inside another package (toolbelt). But take to note(!)
     */
    // slice<tuple>() => tuple
}