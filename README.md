# types-spring 

A package that aims to eliminate some of the shortcomings of the built-in types in standard ts libraries and deliver additional utility types that will facilitate daily work. Inspired by [ts-reset](https://github.com/total-typescript/ts-reset). 

## Built-in types features:

### Array.map

#### before: 

```ts
const a = [1, 2, 3] as const;
let arr = a.map(r => r + '')                              // string[]
```

#### after: 

```ts
const a = [1, 2, 3] as const;
let arr = a.map(r => r + '')                             // [string, string, string]
```

### Object.assign

#### before: 

```ts
let t = Object.assign({ a: 7, b: 8 }, { b: '' })        // {a: number, b: never}
```

#### after: 

```ts
let t = Object.assign({ a: 7, b: 8 }, { b: '' })        // {a: number, b: string}
```


### Object.keys

#### before:

```ts
const obj = { a: 1, b: 1 }

const keys = Object.keys(obj)                    // string[]
const entries = Object.entries(obj)              // [string, number][]
```

#### after:

```ts
const obj = { a: 1, b: 1 }

const keys = Object.keys(obj)                     // ("a" | "b")[]
const entries = Object.entries(obj)               // ["a" | "b", number][]
```

## DOM features:

### querySelector

Improves detecting Element type from selector signature. 

#### before: 


*Original `querySelector` required just to use generic to specify returned type that may differ from the runtime:*


```ts
const input = document.querySelector('input');                                              // is HTMLInputElement | null
const unknown = document.querySelector('.cls');                                             // is Element | null
const inputWCls = document.querySelector('input.cls');                                      // is Element | null
/// pass the wrong generic type due to a typo and get a type discrepancy with the runtime:
const misspell = document.querySelector<HTMLInputElement>('a.cls');                         // is HTMLInputElement | null
if (divCls) {
    inputWCls.value = ''                                                                    // error
    const replaced = misspell.value.replace('.', ',')                                       // runtime error!
}
```

#### after:

```ts
const input = document.querySelector('input');          // is HTMLInputElement | null
const unknown = document.querySelector('.cls');         // is Element | null
const inputWCls = document.querySelector('input.cls');  // is HTMLInputElement | null
if (divCls) {
    inputWCls.value = ''                                // success
}
```

### cloneNode

Now HTMLElement.cloneNode allways returns HTMLElement:

#### before: 

```ts
const elem = document.getElementById('id')              // elem is HTMLElement
const clonedElem = elem?.cloneNode()                    // clonedElem is Node
```

#### after:

```ts
const elem = document.getElementById('id')              // elem is HTMLElement
const clonedElem = elem?.cloneNode()                    // clonedElem is HTMLElement also
```

## Utility types:

Look up `README.md` inside corresponding [declarations](https://github.com/Sanshain/types-spring/tree/master/sources/utils).
