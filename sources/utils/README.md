<div align="center"></div>
    
## Utility types:

<details>
    <summary><h4>Table of content</h3></summary>
    

#### Arrays:
- [KeysArray](#keysarraykeys)
- [ConstrainArray](#constrainarraynumber-type)
- [Sequence](#sequencenumber)
- [WideArray](#widearraytuple)
- [ConvertTupleType](#converttupletypetuple)
- [ArrayFilter](#arrayfilterunknown-type)
- [MapArray](#maparrayunknown-key)

#### Objects:

- [NonNullableKeys](#nonnullablekeystype)
- [OmitNullable](#omitnullabletype)
- [Merge](#mergetype-type)
- [MergeAll](#mergealltypes)
- KeysMatching
- [MapType](#maptypeobject-key)
- [UnionToIntersection](#uniontointersectionu)
- [IsUnion](#isuniont)
- [Common](#commontype-type)
- [Diff](#difftype-type)
- [OptionalExceptOne](#optionalexceptoneobject)
- [ObjectLength](#objectlengthtype)

#### Unions: 

- Enumerate
    
</details>
  




### [KeysArray\<Keys\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L14)

Creates tuple like array type from an object type:

```ts
type ObjType = {
    a: string;
    b: string;
    c: string;
};

const bar: KeysArray<ObjType> = ["d"];            // expected error => Type "d" is not assignable to type "a" | "b" | "c"

const foo: KeysArray<ObjType> = [                 // expected success
    "a", "b", "c"
];    
```

<details>
<summary><b>Constraits</b></summary>

- *This is a rather complex recursive type and is designed directly for objects containing a little number of fields in order to maintain high performance of typescript server (no more than six are recommended)*
</details>

### [OmitNullable\<Type\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L39)

```ts
type User = {
    name: string;
    email: string | null;
};

type NonNullableUserPropertyKeys = OmitNullable<User>;    // {name: string}
```

### [NonNullableKeys\<Type\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L23)

Extracts required keys from object: 

```ts
type User = {
    name: string;
    name1: string;
    email: string | null;
    email1: string | null;
};

let a: NonNullableKeys<User> = 'name'  // 'name' | 'name1'
```

### [ParseInt\<string\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L54)

Extracts number from string

```ts
type N = ParseInt<'7'>    // type N = 7
```

### [ConstrainArray\<number, type\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L69)

Generates fixed length array with specified type

```ts
export let names: ConstrainArray<2, boolean> = [false, true]    // [boolean, boolean]
```

### [Indexes\<const Array\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L86)

Extract indexes from tuple like keyof object

```ts
export const testArray = [
    "test1",
    "test2",
    "test3",
    "test4"
] as const;

type ArrayIndex = Indexes<typeof testArray>;     // 0 | 1 | 2 | 3
```

### [Sequence\<number\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L101)

generates a tuple of the specified length as a sequence of numbers from 0:

```ts
let re: Sequence<3>                             // [0, 1, 2]
```

### [Merge\<Type, Type\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L124)

Merges fields from two types  like js spread or flow types spread

```ts
type A = {
    a: string,
    b: number
}
type B = {
    b: string,
    c: number
}

type C = Merge<A, B>
let c: C;                                       // {a: string, b: string, c: number}
```

### [MergeAll\<[...Types]\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L135)

Merges fields from unlimited amount of types like js spread or flow types spread

```ts
type A = {
    a: string,
    b: number
}
type B = {
    b: string,
    c: number
}

type C = MergeAll<[A, B, { d: 7 }]>
let c: C;                                       // {a: string, b: string, c: number, d: 7}
```

### [WideArray\<Tuple\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L168)

Converts types of the tuple to corresponding common type

```ts
const arr = [1, 2, 3] as const                  // type is [1, 2, 3]
type R = WideArray<typeof arr>                  // type is [number, number, number]
```

### [ConvertTupleType\<Tuple\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L183)

Converts types of the tuple to specified type

```ts
const arr = [1, 2, 3] as const                  // type is [1, 2, 3]
type R = ConvertTupleType<typeof arr, string>
let r: R;                                       // type is [number, number, number]
```

### [ArrayFilter<unknown[], Type>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L239)

Excludes from array all types except Type

```ts
const _a = [1, 2, ''];                          // (string | number)[]
let rt: ArrayFilter<typeof _a, number>          // string[]
```

### [MapArray<unknown[], key>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L253)

Map array item (object) to reduced object from specified key

```ts
type A = [
    { a: number, b: string },
    { a: string, c: boolean }
]

type R = MapArray<A, 'a'>                       // [number, string]
```


### [MapType<object, key>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#LL267C13-L267C21)

Map object item (object) to reduced object from specified key

```ts
type O = {
    a: { value: number, },
    b: { value: string, }
}

let yyy: MapTypeValue<O, "value">               // {a: number, b: number} 
```

### UnionToIntersection\<U\>

Converts union to intersection

```ts
let a: UnionToIntersection<{ a: 1 } | { b: 1 }> = { a: 1, b: 1 }
```

### IsUnion\<T\>

Detects whether the type is union

```ts
let a: IsUnion<string | number> = true
let b: IsUnion<string> = false
```

### [Common\<Type, Type\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L307)

Highlights common properties

```ts
type A = { a: number, b: number, c: number }
type B = { aa: number, b: number, c: string }
let c: Common<A, B>                               // {b: number, c: number | string}
```

### Diff\<Type, Type\>

returns an object with properties of the first type that are not present in the second

```ts
type A = { a: number, b: number, c: number }
type B = { b: number, c: string }
let c: Diff<A, B>                                // {a: number}  
```

### [OptionalExceptOne\<object\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#L333)

Makes all fields optional, except for any one of them

```ts
type O = OptionalExceptOne<{a: 1, b: 1, c: 1}>
let o: O = {}                                     // type error!
let oa: O = {a: 1}                                // success
```

### [ObjectLength\<Type\>](https://github.com/Sanshain/types-spring/blob/master/sources/utils/index.ts#367)

Counts the number of keys in an object

```ts
type Obj = {
    id: number;
    id_user: string;
    is_active: boolean;
};
let objectLengt: ObjectLength<Obj>                 // 3
```

<br>
<hr>
<br>


## Table of contents as table:

|Arrays|Objects|Unions|
|------|-------|------|
|[KeysArray](#keysarraykeys)|[Merge](#mergetype-type)|Enumerate|ParseInt|
|[ConstrainArray](#constrainarraynumber-type)|[MergeAll](#mergealltypes)|Ranged||
|[Sequence](#sequencenumber)|[Diff](#diff)|||
|[WideArray](#widearraytuple)|[Common](#common)|||
|[ConvertTupleType](#converttupletypetuple)|[OmitNullable](#omitnullabletype)|||
|[ArrayFilter](#arrayfilterunknown-type)|[NonNullableKeys](#nonnullablekeystype)|||
|[MapArray](#maparrayunknown-key)|[MapType](#maptypeobject-key)|||
||[IsUnion](#isuniont)|||
||[UnionToIntersection](#uniontointersectionu)|||
||KeysMatching|||
||[OptionalExceptOne](#optionalexceptoneobject)|||
||[ObjectLength](#objectlengthtype)|||


<details>

<summary><h4>Pseudocode:</h4></summary>

- [KeysArray:](#keysarraykeys) `a|b|c` => `[a, b, c]`
- [NonNullableKeys:](https://github.com/Sanshain/types-spring/tree/master/sources/utils#nonnullablekeystype) `{k0?, k1, k2}` => `k2 | k2`
- [OmitNullable:](https://github.com/Sanshain/types-spring/tree/master/sources/utils#omitnullabletype) `{k0?, k1, k2}` => `{k2, k2}`
- [ConvertTupleType:](https://github.com/Sanshain/types-spring/tree/master/sources/utils#constraitarraynumber-type) `<number, type>` => `tuple<type>`
- [Indexes:](https://github.com/Sanshain/types-spring/tree/master/sources/utils#indexesconst-array) `<tuple>` => `keyof tuple`
- [Sequence](https://github.com/Sanshain/types-spring/tree/master/sources/utils#sequencenumber) `<number>` => `tuple<number>`
- [Merge:](https://github.com/Sanshain/types-spring/tree/master/sources/utils#mergetype-type) `<A, B>` => `{...A, ...B}`
- [MergeAll:](https://github.com/Sanshain/types-spring/tree/master/sources/utils#mergealltypes) `<[A, B, C]>` => `{...A, ...B, ...C}`
- [ArrayFilter](https://github.com/Sanshain/types-spring/tree/master/sources/utils#arrayfilterunknown-type) `<(A|B|C)[], A>` => `(B|C)[]`
- [MapArray:](https://github.com/Sanshain/types-spring/tree/master/sources/utils#maparrayunknown-key) `[{value: number}]` => `[number]`
- [MapType:](https://github.com/Sanshain/types-spring/tree/master/sources/utils#maptypeobject-key) `{a: {value: number}}` => `{a: number}`

</details>
