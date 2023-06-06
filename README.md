# types-spring (unsafe branch)

### unsafe branch

[![npm](https://img.shields.io/npm/v/types-spring)](https://www.npmjs.com/package/types-spring)
[![npm](https://img.shields.io/npm/dm/types-spring)](https://www.npmjs.com/package/types-spring)

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

const keys = Object.keys<O>({a: 1, b: 1})        // ("a" | "b")[]
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

   
### currentTarget
    
Improved automatic type detection for the `currentTarget` in `MouseEvent`, `KeyboardEvent` and other user interface events:
    
#### before:
    
```ts
let elem: HTMLDivElement = document.querySelector('div');
elem?.addEventListener('click', e => {        
    let target = e.currentTarget;                       // is EventTarget | null
})
```
    
    
#### after:
    
```ts
let elem: HTMLDivElement = document.querySelector('div');
elem?.addEventListener('click', e => {        
    let target = e.currentTarget;                       // is HTMLDivElement | null
})
```
  
    
## Utility types:

Look up `README.md` inside corresponding [declarations](https://github.com/Sanshain/types-spring/tree/master/sources/utils).



## How to use

```sh
npm i -D Sanshain/types-spring#unsafe
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

## Similar packages:
        
## ts-reset
        
As it was said at the beginning, this package was inspired by [ts-reset](https://github.com/total-typescript/ts-reset). At first glance, it seemed that the `ts-reset` does very little: it just overrides in tslib `any` to `unknown` type wherever possible, and contains very limited number of improvements (like `Array.filter`). However despite the fact that in this one there are not so much features, it is very profound and I would say that the author is very scrupulous about safing.
        
#### Compatibility
        
Despite the modest ts-reset contribution to typescript world, I was tempted to use some of its features in `types-spring`, but I deliberately did not do that in order not to repeat what other people have already done in the best possible way before me. I consider `ts-reset` as be a fundamental package, and the best thing to do today is to use these two these packages (`ts-reset` and `types-spring`) together
        
## types-fest

This is a [awesome package](https://github.com/sindresorhus/type-fest) with a huge number of utility types. When I started working on types-string, I didn't know anything about it. However, when I got awared, to my surprise found that most of them (with the exception of just two) do not overlap with `types-spring`! It turns out that these are completely different packages with different tools, since their authors think differently. 
        
#### Compatibility
        
`types-spring` and `types-fest` may well complement each other. Of course, that's so
        
## Licence
        
MIT
        
![GitHub](https://img.shields.io/github/license/Sanshain/types-spring)
