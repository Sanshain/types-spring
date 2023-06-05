//@ts-check


/// Array.map


const a = [1, 2, 3] as const;
let arr = a.map(r => r + '')
let item = arr[3]


/// Array.indexOf


function getIndex(arg: number) {
    //@ts-expect-error
    var index = a.indexOf(arg)    
}



/// Array.isArray


function checkIsReadonlyArray(a: { a: 1 } | ReadonlyArray<number>) {
    if (Array.isArray(a)) {
        a[0] = 1
        a.forEach(item => item.f())
    }
    else {
        //@ts-expect-error
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




/// Object.assign

const o1 = { a: 1, b: 1 };
const o2 = { b: '', c: 1 }

//@ts-expect-error
Object.assign(o1, o2).b = 'ok'




/// Object.defineProperty

let ro = Object.defineProperty(1, "name", {})
const r = Object.defineProperty({ a: 1 }, "b", {
    value: 1,
});

let n: number = r.a
//@ts-expect-error
let v = r.b;


/// Object.defineProperties


{

    const rs = Object.defineProperties({ a: 1 }, {
        d: {
            value: 1,
            writable: true
        }
    });

    let na: number = rs.a
    //@ts-expect-error: d does not exists!
    let nd: number = rs.d
}



/// Object.create:

{
    let o = Object.create(null)    
    if (o === 1) { }
}










/// Object.keys:

let k = Object.keys({ a: 1 })
function succesFunc(arg: string) {
    k[0] = arg;
}
