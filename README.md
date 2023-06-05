# types-spring 

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

A very strong temptation was to make an `Object.keys(obj)` returned `(keys of obj)[]` instead of `string[]`. However, in the process it was found out that such use is safe only if the received keys are used exclusively for comparison with primitives. But using them again as object type keys can lead to non-obvious errors at runtime (see for [example](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgPICMBWEFgMID2IAzmFAK64FTIDeAUMk8gPQBUbjzybyAShDDkoJZGAAWKEHAC2EYsgIwxk5BBDk5UOOgA2KUlFABzZAAcoBM9DDB5yOCAAmyORIJOFShyEVYcYAB0XMy8AAJmcNoyimj+uCpwYMgIRGBwoAoSKBZWNnYKji5u4h7EgcgAKuLACgiOyOgoDQTxyRJJyACeBOQpUBBJEC7UPmoAHrW2IKYAIgQImurJGNgJALIeELrIABSzqOsAlH5rQSFMbCzcFwDWEF3EADyVE5DOXm0AfLsEAFxVI4AgCCUG0XSe9x6ykqXwA3BdlkZ5C83upPKcAj9-oCQWC4BCANpQ7yVAA0VWJD1JAF0afDuDcAL70eipEjJYgEOSrAG0BwAjQyJpQOGNQWaEVihAS4XQZBM5AAXjoAuQAEYAAwU9AAgBM2pSAIAzJqFWyiKRkFyeVg9Xy1UKpeLkE75YqVTaIKtWeyrTACAQmCrdlDiHjwZDqcowF1rN4vas9V8TkqvnQLn7kjI4GY+YSANLIUDIEkxuMQBPc712ml8gM4t1QJke1VwB0NgFahU6juB-Vmlus7gDIQiUsPco5syhh7K9PTqldGmBBtHegs+gN3arAKBMO7RN2o5HIA), which will cause a runtime error). Thus, the usual redefinition of the type makes it less secure, and therefore we have abandoned such redefinition in this package. However, if you are determined, there is a safe way for you to do this using the [ts-keys-turn](https://github.com/Sanshain/ts-keys-turn) package

<details>
    <summary><h4>Object.keys with `ts-keys-turn`<h4></summary>

#### before:

```ts
type O = { a: number, b: number }
const obj: O = { a: 1, b: 1 }
const keys = Object.keys(obj)                    // string[]
```

#### after ts-keys-turn:

```ts
const keys = Object.keys<O>(obj)                  // ("a" | "b")[]
```    

However, this approach has several constraints (see the [documentation](https://github.com/Sanshain/ts-keys-turn#constraints))
    

        
</details>
        
Look up the section on configuring the package for use with [Object.keys](https://github.com/Sanshain/ts-keys-turn/blob/master/README.md#using-keys-for-transformataion-requires-the-following-steps)
        
<details>
    <summary><h4>Object.keys with unsafe branch<h4></summary>

There is also an [unsafe branch](https://github.com/Sanshain/types-spring/tree/unsafe) that contains the aforementioned `Object.keys` declaration, which assumes its use without any transformations, if you are willing to take responsibility for its use as keys
    
```ts
const keys = Object.keys<O>({a: 1, b: 1})        // ("a" | "b")[]
```
    
</details>
    

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

## Similar packages:
        
## ts-reset
        
As it was said at the beginning, this package was inspired by [ts-reset](https://github.com/total-typescript/ts-reset). At first glance, it seemed that the `ts-reset` does very little: it just overrides in tslib `any` to `unknown` type wherever possible, and contains two useful improvements for `Array.indexOf` and `Array.filter`. However despite the fact that in this one there are not so much features, it is very profound and I would say that the author is very scrupulous about safing.
        
#### Compatibility
        
Despite the small contribution of ts-reset, I was very tempted to use some of its functions in types-spring, but I deliberately did not do it in order not to repeat what other people have already done in the best possible way before me. I consider `ts-reset` as be a fundamental package, and the best thing to do today is to use these two these packages (`ts-reset` and `types-spring`) together
        
## types-fest

This is a [awesome package](https://github.com/sindresorhus/type-fest) with a huge number of utility types. When I started working on types-string, I didn't know anything about it. However, when I got awared, to my surprise found that most of them (with the exception of just two) do not overlap with `types-spring`! It turns out that these are completely different packages with different tools, since their authors think differently. 
        
#### Compatibility
        
`types-spring` and `types-fest` may well complement each other. Of course, that's so
        
## Licence
        
MIT
        
![GitHub](https://img.shields.io/github/license/Sanshain/types-spring)
