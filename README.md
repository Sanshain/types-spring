# types-spring 

A package that aims to eliminate some of the shortcomings of the built-in types in tslib and deliver additional utility types that will facilitate daily work. Inspired by [ts-reset](https://github.com/total-typescript/ts-reset). 

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

## Utility types:

Look up README.md inside corresponding declarations
