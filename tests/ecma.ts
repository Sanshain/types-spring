//@ts-check


/// Array.map


const a = [1, 2, 3] as const;
let arr = a.map(r => r + '')
//@ts-expect-error
let item = arr[3]


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