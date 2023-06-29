/** known unresolved TS bugs */
// (unresolved by me too)


// #1 `leaky type guarding on objects union`

{
    interface A { a(): string };
    interface B { b(): string };

    function f(x: A | B): string {
        if ("a" in x) {
            return x.a();                                   // runtime error!
        } else {
            return x.b();
        }
    }

    const x = { a: 10, b() { return "hello"; } };
    const y: B = x;
    f(y);    
}

// or: 

function func(arg: {a: string, b?: string} | {a: string, b: string, c?: string}){
    
    if ('c' in arg){
        arg.b.toString()                                     // runtime error!
    }
}

let a = {a: '', c: ''}

func(a)




// #2 `bad signature` 

Object.defineProperty(1, '', {})                            // runtime error!
Object.defineProperties(100, {})                            // runtime error!


// #2.1 (+ alse could break any type)

let a: Record<string, string> = {a: ''}
Object.defineProperty(a, 'a', {value: 1})



// # 3 `covariance`

interface IBar {
    [key: string]: IBar[keyof IBar],
    a: number
}

type Bar = { a: number; }

const bar2 = { a: 10, b: '30' }
const bar: Bar = bar2


const foo = (a: IBar) => {
    let y = Object.entries(a)
    y.map(u => u[1].toFixed())                            // runtime error!
}

foo(bar)

