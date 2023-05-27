# types-spring 

A package that aims to eliminate some of the shortcomings of the built-in types in standard ts libraries and deliver additional utility types that will facilitate daily work. Inspired by [ts-reset](https://github.com/total-typescript/ts-reset). 

## Built-in types features:

### Object.assign

#### BEFORE: 

```ts
let t = Object.assign({ a: 7, b: 8 }, { b: '' })        // {a: number, b: never}
```

#### AFTER: 

```ts
let t = Object.assign({ a: 7, b: 8 }, { b: '' })        // {a: number, b: string}
```


### Object.keys

#### BEFORE:

```ts
const obj = { a: 1, b: 1 }

const keys = Object.keys(obj)              // is string[]
const entries = Object.entries(obj)        // is [string, number][]
```

#### AFTER:

```ts
const obj = { a: 1, b: 1 }

const keys = Object.keys(obj)              // is ("a" | "b")[]
const entries = Object.entries(obj)        // is ["a" | "b", number][]
```

## DOM features:

### querySelector

#### BEFORE: 

```ts
const div = document.querySelector('div');           // is HTMLDIVElement | null
const unknown = document.querySelector('.cls');      // is Element | null
const divCls = document.querySelector('div.cls');    // is Element | null
if (divCls) {
    divCls.innerText = ''                            // error
}
```

#### AFTER:

```ts
const div = document.querySelector('div');              // is HTMLDIVElement | null
const unknown = document.querySelector('.cls');         // is Element | null
const divCls = document.querySelector('div.cls');       // is HTMLDIVElement | null
if (divCls) {
    divCls.innerText = ''                               // success
}
```

### cloneNode

#### BEFORE: 

```ts
const elem = document.getElementById('id')              // elem is HTMLElement
const clonedElem = elem?.cloneNode()                    // clonedElem is Node
```

#### AFTER:

```ts
const elem = document.getElementById('id')              // elem is HTMLElement
const clonedElem = elem?.cloneNode()                    // clonedElem is HTMLElement also
```

## Utility types:

Look up `README.md` inside corresponding [declarations](https://github.com/Sanshain/types-spring/tree/master/sources/utils).
