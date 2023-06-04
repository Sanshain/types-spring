/** known unresolved TS bugs */
// (unresolved by me too)


// #1

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

// #2

Object.defineProperty(1, '', {})                            // runtime error!




