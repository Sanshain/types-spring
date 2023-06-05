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

### Array.isArray

#### before: 

```ts
function checkArray(a: { a: 1 } | ReadonlyArray<number>) 
{
    if (Array.isArray(a)) {                              
        a.forEach(item => item.f())                         // => runtime error!
    }
    else { a.a }                                            // type error: property `a` does not exists!
}
```

#### after: 

```ts
function checkArray(a: { a: 1 } | ReadonlyArray<number>) 
{
    if (Array.isArray(a)) {
        a.forEach(item => item.f())                         // type error: f does not exist on type number
    }
    else { a.a }                                            // success 
}
```

### Object.assign

#### before: 

```ts
let t = Object.assign({ a: 7, b: 8 }, { b: '' })            // {a: number, b: never}
```

#### after: 

```ts
let t = Object.assign({ a: 7, b: 8 }, { b: '' })            // {a: number, b: string}
```

### Object.defineProperty

#### before:

```ts
const a = { a: 1 }
const r = Object.defineProperty(a, "b", { value: 1, });     // {a: number}
```

#### after: 

```ts
const a = { a: 1 }
const r = Object.defineProperty(a, "b", { value: 1, });     // {a: number, readonly b: number}
```

### Object.defineProperties

#### before:

```ts
const a = { a: 1 }
const rs = Object.defineProperties({ a: 1 }, {              // {a: number}
    b: { value: 1 }
});
```

#### after: 

```ts
const a = { a: 1 }
const rs = Object.defineProperties({ a: 1 }, {              // {a: number, readonly b: number}
    b: { value: 1 }
});
```



### Object.keys

A very strong temptation was to make an `Object.keys(obj)` returned `(keys of obj)[]` instead of `string[]`. However, in the process it was found out that such use is safe only if the received keys are used exclusively for comparison with primitives. But using them again as object type keys can lead to non-obvious errors at runtime (see for [example](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgPICMBWEFgMID2IAzmFAK64FTIDeAUMk8gPQBUbjzybyAShDDkoJZGAAWKEHAC2EYsgIwxk5BBDk5UOOgA2KUlFABzZAAcoBM9DDB5yOCAAmyORIJOFShyEVYcYAB0XMy8AAJmcNoyimj+uCpwYMgIRGBwoAoSKBZWNnYKji5u4h7EgcgAKuLACgiOyOgoDQTxyRJJyACeBOQpUBBJEC7UPmoAHrW2IKYAIgQImurJGNgJALIeELrIABSzqOsAlH5rQSFMbCzcFwDWEF3EADyVE5DOXm0AfLsEAFxVI4AgCCUG0XSe9x6ykqXwA3BdlkZ5C83upPKcAj9-oCQWC4BCANpQ7yVAA0VWJD1JAF0afDuDcAL70eipEjJYgEOSrAG0BwAjQyJpQOGNQWaEVihAS4XQZBM5AAXjoAuQAEYAAwU9AAgBM2pSAIAzJqFWyiKRkFyeVg9Xy1UKpeLkE75YqVTaIKtWeyrTACAQmCrdlDiHjwZDqcowF1rN4vas9V8TkqvnQLn7kjI4GY+YSANLIUDIEkxuMQBPc712ml8gM4t1QJke1VwB0NgFahU6juB-Vmlus7gDIQiUsPco5syhh7K9PTqldGmBBtHegs+gN3arAKBMO7RN2o5HIA), which will cause a runtime error). However, if you are determined, there is a safe way for you to do this using the `ts-keys-applier` package (aka [ts-keys-turn](https://github.com/Sanshain/ts-keys-turn))

<details>
    <summary>Example</summary>

#### before:

```ts
type O = { a: number, b: number }
const obj: O = { a: 1, b: 1 }
const keys = Object.keys(obj)                    // string[]
```

#### with ts-keys-applier:

```ts
const keys = Object.keys<O>(obj)                  // ("a" | "b")[]
```    
    
</details>

However, this approach has several constraints (see the [documentation](https://github.com/Sanshain/ts-keys-turn#constraints))
    
Look up the section on configuring the package for use with [Object.keys](https://github.com/Sanshain/ts-keys-turn/blob/master/README.md#using-keys-for-transformataion-requires-the-following-steps)
    

## DOM features:

### querySelector

Improves detecting Element type from selector signature. 

#### before: 


```ts
const input = document.querySelector('input');                         // is HTMLInputElement | null
const unknown = document.querySelector('.cls');                        // is Element | null
const inputWCls = document.querySelector('input.cls');                 // is Element | null

if (divCls) {
    inputWCls.value = ''                                               // error
}
```

#### after:

```ts
const input = document.querySelector('input');                      // is HTMLInputElement | null
const unknown = document.querySelector('.cls');                     // is Element | null
const inputWCls = document.querySelector('input.cls');              // is HTMLInputElement | null
if (divCls) {
    inputWCls.value = ''                                            // success
}
```

### querySelector\<Type\>

Original `querySelector` required just to use generic to specify returned type that may differ from the runtime:

#### before: 

```ts
const misspell = document.querySelector<HTMLInputElement>('a.cls');         // is HTMLInputElement | null
if (misspell){
    const replaced = misspell.value.replace('.', ',')                       // runtime error!
}
```

#### after:

```ts
const misspell = document.querySelector('a.cls');                           // is HTMLInputElement | null
if (misspell){
    const replaced = misspell.value.replace('.', ',')                       // typescript error!
}
```

### cloneNode

Now `HTMLElement.cloneNode` allways returns `HTMLElement`:

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



## How to use

```ts
npm i -D types-spring
```

#### To patch the built-in types: 

add <b>types-spring</b> to <code>include</code> list inside <code>tsconfig.json</code>:
    
```tsconfig.json
{
    // ...,
    "include": [
        "./node_modules/**/*"
    ]    
}
```


