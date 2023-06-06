
## Utility types:

### KeysArray\<Keys\>

Creates tuple like array type from an object type:

```ts
type ObjType = {
    a: string;
    b: string;
    c: string;
};

const bar: KeysArray<keyof ObjType> = ["d"];      // expected error => Type "d" is not assignable to type "a" | "b" | "c"

const foo: KeysArray<keyof ObjType> = [           // expected success
    "a", "b", "c"
];    
```

### RequiredKeys\<Type\>

Extracts required keys from object: 

```ts
type User = {
    name: string;
    name1: string;
    email: string | null;
    email1: string | null;
};

let a: RequiredKeys<User> = 'name'  // 'name' | 'name1'
```

### OmitNullable\<Type\>

```ts
type User = {
    name: string;
    email: string | null;
};

type NonNullableUserPropertyKeys = OmitNullable<User>;    // {name: string}
```

### ParseInt\<string\>

Extracts number from string

```ts
type N = ParseInt<'7'>    // type N = 7
```

### ConstraitArray\<number, type\>

Generates fixed length array with specified type

```ts
export let names: ConstraitArray<2, boolean> = [false, true]    // [boolean, boolean]
```

### Indexes\<const Array\>

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

### Sequence\<number\>

generates a tuple of the specified length as a sequence of numbers from 0:

```ts
let re: Sequence<3>                             // [0, 1, 2]
```

### Merge\<Type, Type\>

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

### MergeAll\<[...Types]\>

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

### WideArray\<Tuple\>

Converts types of the tuple to corresponding common type

```ts
const arr = [1, 2, 3] as const                  // type is [1, 2, 3]
type R = WideArray<typeof arr>                  // type is [number, number, number]
```

### ConvertTupleType\<Tuple\>

Converts types of the tuple to specified type

```ts
const arr = [1, 2, 3] as const                  // type is [1, 2, 3]
type R = ConvertTupleType<typeof arr, string>
let r: R;                                       // type is [number, number, number]
```

### ArrayFilter<unknown[], Type>

Excludes from array all types except Type

```ts
const _a = [1, 2, ''];                          // (string | number)[]
let rt: ArrayFilter<typeof _a, number>          // string[]
```

### MapArray<unknown[], key>

Map array item (object) to reduced object from specified key

```ts
type A = [
    { a: number, b: string },
    { a: string, c: boolean }
]

type R = MapArray<A, 'a'>                       // [number, string]
```


### MapType<object, key>

Map object item (object) to reduced object from specified key

```ts
type O = {
    a: { value: number, },
    b: { value: string, }
}

let yyy: MapTypeValue<O, "value">               // {a: number, b: number} 
```

<br>
<hr>
<br>

## table of contents:


- [`<keyof object>` => `keys[]`](https://github.com/Sanshain/types-spring/tree/master/sources/utils#keysarraykeys)
- [`{keys: value}` => `requiredkeys[number]`](https://github.com/Sanshain/types-spring/tree/master/sources/utils#requiredkeystype)
- [`{k0?, k1, k2}` => `{k2, k3}`](https://github.com/Sanshain/types-spring/tree/master/sources/utils#omitnullabletype)
- [`<number, type>` => `tuple<type>`](https://github.com/Sanshain/types-spring/tree/master/sources/utils#constraitarraynumber-type)
- [`<tuple>` => `keyof tuple`](https://github.com/Sanshain/types-spring/tree/master/sources/utils#indexesconst-array)
- [`<number>` => `tuple<number>`](https://github.com/Sanshain/types-spring/tree/master/sources/utils#sequencenumber)
- [`<A, B>` => `{...A, ...B}`](https://github.com/Sanshain/types-spring/tree/master/sources/utils#mergetype-type)
- [`[A, B, C]` => `{...A, ...B, ...C}`](https://github.com/Sanshain/types-spring/tree/master/sources/utils#mergealltypes)
- [`<(A|B|C)[], A>` => `(B|C)[]`](https://github.com/Sanshain/types-spring/tree/master/sources/utils#arrayfilterunknown-type)
- [`[{value: number}]` => `[number]`](https://github.com/Sanshain/types-spring/tree/master/sources/utils#maparrayunknown-key)
- [`{a: {value: number}}` => `{a: number}`](https://github.com/Sanshain/types-spring/tree/master/sources/utils#maptypeobject-key)
