# types-spring 

A package that aims to eliminate some of the shortcomings of the built-in types in standard ts libraries and deliver additional utility types that will facilitate daily work. Inspired by [ts-reset](https://github.com/total-typescript/ts-reset). 

## Built-in types features:

### Array.indexOf

#### BEFORE:

```ts
const arr = [1, 2, 3] as const

function func(a:number) {
    const index = arr.indexOf(2)        // success
    const index = arr.indexOf(a)        // error => Argument of type 'number' is not assignable to parameter of type '1 | 2 | 3'
}
```

#### AFTER: 


```ts
const arr = [1, 2, 3] as const

function func(a:number) {
    const index = arr.indexOf<any>(a))  // success
    const index = arr.indexOf<any>(5))  // success
    const index = arr.indexOf<any>('')) // error => Argument of type 'string' is not assignable to parameter of type '1 | 2 | 3'
    const index = arr.indexOf(a)        // error => Argument of type 'number' is not assignable to parameter of type '1 | 2 | 3'    
}
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
