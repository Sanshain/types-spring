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



/// Object.assign

const o1 = { a: 1, b: 1 };
const o2 = { b: '', c: 1 }

//@ts-expect-error
Object.assign(o1, o2).b = 'ok'


/// Object.keys:


let k = Object.keys({ a: 1 })
function succesFunc(arg: string) {    
    k[0] = arg;    
}



