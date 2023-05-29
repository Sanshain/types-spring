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
type O = { a: number, b: number }
const obj: O = { a: 1, b: 1 }

const keys = Object.keys(obj)                    // string[]
const entries = Object.entries(obj)              // [string, number][]
```

#### after:

```ts
type O = { a: number, b: number }
const obj: O = { a: 1, b: 1 }

const keys = Object.keys<O>(obj)                  // ("a" | "b")[]
const entries = Object.entries<O>(obj)            // ["a" | "b", number][]
```

*Important: use the overridden signature with generic only if you plan to use the received keys exclusively for comparison with primitives - such use is type-safe. However, if you decide to use them again as keys, know that with a careless approach, you can get a runtime errors like caused by [this](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgPICMBWEFgMID2IAzmFAK64FTIDeAUMk8gPQBUbjzybyAShDDkoJZGAAWKEHAC2EYsgIwxk5BBDk5UOOgA2KUlFABzZAAcoBM9DDB5yOCAAmyORIJOFShyEVYcYAB0XMy8AAJmcNoyimj+uCpwYMgIRGBwoAoSKBZWNnYKji5u4h7EgcgAKuLACgiOyOgoDQTxyRJJyACeBOQpUBBJEC7UPmoAHrW2IKYAIgQImurJGNgJALIeELrIABSzqOsAlH5rQSFMbCzcFwDWEF3EADyVE5DOXm0AfLsEAFxVI4AgCCUG0XSe9x6ykqXwA3BdlkZ5C83upPKcAj9-oCQWC4BCANpQ7yVAA0VWJD1JAF0afDuDcAL70eipEjJYgEOSrAG0BwAjQyJpQOGNQWaEVihAS4XQZBM5AAXjoAuQAEYAAwU9AAgBM2pSAIAzJqFWyiKRkFyeVg9Xy1UKpeLkE75YqVTaIKtWeyrTACAQmCrdlDiHjwZDqcowF1rN4vas9V8TkqvnQLn7kjI4GY+YSANLIUDIEkxuMQBPc712ml8gM4t1QJke1VwB0NgFahU6juB-Vmlus7gDIQiUsPco5syhh7K9PTqldGmBBtHegs+gN3arAKBMO7RN2o5HIA)*

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
const input = document.querySelector('input');          // is HTMLInputElement | null
const unknown = document.querySelector('.cls');         // is Element | null
const inputWCls = document.querySelector('input.cls');  // is HTMLInputElement | null
if (divCls) {
    inputWCls.value = ''                                // success
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


