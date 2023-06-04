//@ts-check


/// Array.map


const a = [1, 2, 3] as const;
let arr = a.map(r => r + '')
//@ts-expect-error
let item = arr[3]


/// Array.isArray


function checkIsReadonlyArray(a: { a: 1 } | ReadonlyArray<number>) {
    if (Array.isArray(a)) {
        //@ts-expect-error
        a[0] = 1
        //@ts-expect-error
        a.forEach(item => item.f())
    }
    else {
        a.a
    }
}

function checkIsArray(a: { a: 1 } | Array<number>) {
    if (Array.isArray(a)) {
        a[0] = 1
        //@ts-expect-error
        a.forEach(item => item.f())
    }
    else a.a
}


/// Array.indexOf


function getIndex(arg: number) {
    //@ts-expect-error
    var index = a.indexOf(arg)
    var index = a.indexOf<number>(arg)    
    //@ts-expect-error
    var index = a.indexOf<string>(arg)
    return index
}



/// Object.assign

const o1 = { a: 1, b: 1 };
const o2 = { b: '', c: 1 }

const o = Object.assign(o1, o2)
o.b = 'ok'


/// Object.defineProperty


const r = Object.defineProperty({ a: 1 }, "name", {
    value: 1,
});


let n: number = r.a
let v: number = r.name;
//@ts-expect-error
r.name = v



/// Object.defineProperties


{
    {
        /// custom (origin):

        const rs = Object.defineProperties<{ a: 1, d?: number | string }>({ a: 1 }, {
            d: {
                // value: 1,
                // writable: true
                set(a) { },
                get() {
                    return 1
                }
            }
        });
        rs.a = 1
        rs.d = ''
    }
    {
        /// get set:

        const rs = Object.defineProperties({ a: 1 }, {
            d: {
                // value: 1,
                // writable: true
                set(a) {},
                get() {
                    return 1
                }
            }
        });

        let na: number = rs.a
        let nd: number = rs.d
        //@ts-expect-error: does not exists
        let nn = rs.name;
        //@ts-expect-error: legacy field => string != number
        let nsa: string = rs.a
        //@ts-expect-error: new field => string != number
        let nsd: string = rs.d
        rs.a = na;
        rs.d = nd;    
    }
    {
        /// get

        const rs = Object.defineProperties({ a: 1 }, {
            d: {
                get() {
                    return 1
                }
            }
        });

        let na: number = rs.a
        let nd: number = rs.d
        //@ts-expect-error: does not exists
        let nn = rs.name;
        //@ts-expect-error: legacy field => string != number
        let nsa: string = rs.a
        //@ts-expect-error: new field => string != number
        let nsd: string = rs.d
        rs.a = na;
        //@ts-expect-error
        rs.d = nd;
    }

    {
        /// writable: true

        const rs = Object.defineProperties({ a: 1 }, {
            d: {
                value: 1,
                writable: true
            }
        });

        let na: number = rs.a
        let nd: number = rs.d
        //@ts-expect-error: does not exists
        let nn = rs.name;
        //@ts-expect-error: legacy field => string != number
        let nsa: string = rs.a
        //@ts-expect-error: new field => string != number
        let nsd: string = rs.d
        rs.a = na;
        rs.d = nd;        
    }
    
    {
        /// writable: false

        const rs = Object.defineProperties({ a: 1 }, {
            d: {
                value: 1,
                writable: false
            }
        });

        let na: number = rs.a
        let nd: number = rs.d
        //@ts-expect-error: does not exists
        let nn = rs.name;
        //@ts-expect-error: legacy field => string != number
        let nsa: string = rs.a
        //@ts-expect-error: new field => string != number
        let nsd: string = rs.d
        rs.a = na;

        //@ts-expect-error !
        rs.d = nd;
    }

    {
        /// writable: undefined

        const rs = Object.defineProperties({ a: 1 }, {
            d: {
                value: 1,                
            }
        });

        let na: number = rs.a
        let nd: number = rs.d
        //@ts-expect-error: does not exists
        let nn = rs.name;
        //@ts-expect-error: legacy field => string != number
        let nsa: string = rs.a
        //@ts-expect-error: new field => string != number
        let nsd: string = rs.d
        rs.a = na;

        //@ts-expect-error !
        rs.d = nd;        
    }

}



/// Object.create:

{
    let o = Object.create(null)
    //@ts-expect-error
    if (o === 1){}
}


/// Object.keys:


let k = Object.keys({ a: 1 })
function succesFunc(arg: string) {    
    //@ts-expect-error
    k[0] = arg;
}

let ku = Object.keys<any>({ a: 1 })
function func(arg: string) {        
    ku[0] = arg;
}



