/** known unresolved TS bugs */
// (unresolved by me too)


// #1 `leaky type guarding`

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

// #2 `bad signature`

Object.defineProperty(1, '', {})                            // runtime error!


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