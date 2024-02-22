//@ts-check

import type {
    OmitNullable,
    _ParseInt,
    NonNullableKey,
    ConstrainedArray,
    WideArray,
    ConvertTupleType,
    Enumerate,
    Ranged, Sequence,
    ArrayFilter,
    MapArray,
    MapType as MapTypeValue,
    KeysMatching,
    IntersectUnion,
    IsUnion,
    Common,
    Diff,
    OptionalExceptOne,
    ScreenType,
    ObjectLength,
    KeysArray,
    ReplaceTypes,
    Join,
    OneOf
} from "../sources/utils";


/// KeysArray:


type ObjType = {
    a: string;
    b: string;
    c: string;
};

{
    //@ts-expect-error =>                                                   type "d" is not assignable to type "a" | "b" | "c".
    const bar: KeysArray<ObjType> = ["d"];
    //@ts-expect-error =>                                                   type '["a", "b", "c", "d"]' is not assignable to type ["a", "b", "c"]
    const foo: KeysArray<ObjType> = ["a", "b", "c", "d"];

    const objKeys: KeysArray<ObjType> & {} = ["a", "b", "c"];

    const objKeys$: KeysArray<ObjType> = ["a", "c", "b"];

    //@ts-expect-error => string[] is not ussignible to `Object with too much (6) fields amount (expected less than 6) passed to KeysArray type`    
    let objKeys8: KeysArray<ObjType & Omit<User, 'name'>, 6> = ["a", "b", "c", 'lastname', 'email', 'phonenumber']
}



/// NonNullableKeys


type User = {
    name: string;
    lastname: string;
    email?: string;
    phonenumber: string | null;
};

{

    let a: NonNullableKey<User> & {} = 'name'
    //@ts-expect-error
    let b: NonNullableKey<User> = 'email'
    //@ts-expect-error
    let c: NonNullableKey<User> = 'phonenumber'    
}




/// OmitNullable

type UserType = {
    name: string;
    email: string | null;
};

//@ts-expect-error
let u: OmitNullable<UserType> = { name: '', email: '' }



/// ParseInt

const num: _ParseInt<'7'> = 7



/// ConstraitArray

let names: ConstrainedArray<2, boolean> = [false, true]
//@ts-expect-error
let names_3: ConstrainedArray<2, boolean> = [false, true, false]
//@ts-expect-error
let strings: ConstrainedArray<2, boolean> = ['', '']



/// Indexes

export const testArray = [
    "test1",
    "test2",
    "test3",
    "test4"
] as const;

let indexes: Indexes<typeof testArray> = 3
//@ts-expect-error
let overloaded: Indexes<typeof testArray> = 4



/// Sequence

let seq: Sequence<3> = [0, 1, 2]
//@ts-expect-error
let faseq: Sequence<3> = [0, 1, 3]
//@ts-expect-error
let leseq: Sequence<3> = [0, 1]
//@ts-expect-error
let moseq: Sequence<3> = [0, 1, 2, 3]



/// Merge

type A = {
    a: number,
    b: string
}
type B = {
    b: number,
    c: number
}
let m: Merge<A, B> = { a: 1, b: 1, c: 1 }
//@ts-expect-error
let ms: Merge<A, B> = { a: 1, b: '', c: 1 }


/// MergeAll


let c: MergeAll<[A, B, { d: 7 }]> = { a: 1, b: 1, c: 1, d: 7 }



/// WideArray


const arr = [1, 2, 3] as const
let ar: WideArray<typeof arr> = [0, 0, 0,]
//@ts-expect-error
let ar2: WideArray<typeof arr> = [0, 0]
//@ts-expect-error
let ar4: WideArray<typeof arr> = [0, 0, 0, 0]
//@ts-expect-error
let ars: WideArray<typeof arr> = ['', '', '']


/// ConvertTupleType

let r: ConvertTupleType<typeof arr, string> = ['', '', '']
//@ts-expect-error
let nr: ConvertTupleType<typeof arr, string> = [1, 2, 3]



/// Enumerate


const en: Enumerate<5> = 0
//@ts-expect-error
const en5: Enumerate<5> = 5



/// Range

const n: Ranged<5, 10> & {} = 5;
//@ts-expect-error
const n0: Ranged<5, 10> = 0;
//@ts-expect-error
const n10: Ranged<5, 10> = 10;




/// KeysMatching

{
    let a = { a: 1, b: '', c: '' };
    //@ts-expect-error
    let keysa: KeysMatching<typeof a, string> = 'a'
    let keys: KeysMatching<typeof a, string> & {} = 'b'
}


/// ArrayFilter

const _a = [1, 2, ''];
let rt: ArrayFilter<typeof _a, number> = [1, 2, 3]
//@ts-expect-error
let rr: ArrayFilter<typeof _a, number> = [1, 2, 3, '']




/// MapType
{
    type O = {
        a: {
            value: number,
        },
        b: {
            value: string,
        }
    }

    function func1(yyy: MapTypeValue<O, "value">) {
        yyy.b = ''
        //@ts-expect-error
        yyy.b = 1
        yyy.a = 1
        //@ts-expect-error
        yyy.a = ''
    }
}




/// MapArray

{
    type A = [
        {
            a: number, b: string
        },
        {
            a: string
        }
    ]
    type R = MapArray<A, 'a'>
    let r: R = [1, '2'];
    //@ts-expect-error
    let r1: R = [1, 2, 3];
    //@ts-expect-error
    let r2: R = [1];
    //@ts-expect-error
    let r3: R = ['', ''];
    //@ts-expect-error
    let r4: R = [{ a: number }, { a: number }];

    {
        type R = MapArray<Array<{ a: number }>, 'a'>
        let r: R = [1, 2];
        let r1: R = [1, 2, 3];
        let r2: R = [1];
        //@ts-expect-error
        let r3: R = ['', ''];
        //@ts-expect-error
        let r4: R = [{ a: number }, { a: number }];
    }

}



/// IntersectUnion:

{
    type A = { a: 1 }
    type B = { b: 1 }
    type AB = A | B
    let a: IntersectUnion<AB> = { a: 1, b: 1 }    
    // let a: IntersectUnion<{ a: 1 } | { b: 1 }> = { a: 1, b: 1 }
    let b: { a: 1 } & { b: 1 } = a
}


/// IsUnion
{
    let a: IsUnion<string | false> = true
    let b: IsUnion<string> = false
}


/// Common:
{
    type A = { a: number, b: number, c: number }
    type B = { aa: number, b: number, c: string }
    let c: Common<A, B> = {
        b: 1,
        c: ''
    }
    //@ts-expect-error
    c.a
    //@ts-expect-error
    c.aa
}

/// Diff:
{
    type A = { a: number, b: number, c: number }
    type B = { aa: number, b: number, c: string }
    let c: Diff<A, B> = { a: 1 }
}


/// OptionalExceptOne
{
    type O = OptionalExceptOne<{ a: 1, b: 1, c: 1 }> 
    //@ts-expect-error
    let o: O = {}
    let oa: O = { a: 1 }
    let ob: O = { b: 1 }
    let oc: O = { c: 1 }
    let ooo: O = { a: 1, b: 1, c: 1 }
    //@ts-expect-error
    let od: O = { d: 1 }
}


/// ScreenType
// {
//     type MyLikeName = ScreenType<string>
//     const s: MyLikeName = '1'
// 	const arf = ['1']
// 	arf.indexOf(s)
// }



/// ObjectLength
{
    type Table = {
        id: number;
        id_user: string;
        is_active: boolean;
        1: '';
    };
    let r4: ObjectLength<Table> = 4;
    //@ts-expect-error
    let r1: ObjectLength<Table> = 1;
    //@ts-expect-error
    let r5: ObjectLength<Table> = 5;
}


/// Join
{
    type A = [{ a: number }, { c: number }, { d: string }]
    type O = Join<A>
    let o: O = {
        a: 1,
        c: 3,
        d: ''
    }
}


/// OneOf
{
    type Params = {
        a: 1,
        b: 1,
        c: 1
    }

    let a: OneOf<Params> = {a: 1}
    let b: OneOf<Params> = {b: 1}
    //@ts-expect-error
    let ab: OneOf<Params> = {a: 1, b: 1}
    //@ts-expect-error
    let abc: OneOf<Params> = {a: 1, b: 1, c: 1}
}



/// ReplaceTypes
{
    type Profile = {
        s: string, b: number,
        c: { f: string }
    }

    let rrr: ReplaceTypes<Profile, string, number> = {
        s: 1,
        b: 1,
        c: {f: 1}
    }

    let tt: ReplaceTypes<['', '', 5], string, 0> = [0, 0, 5];
    //@ts-expect-error
    let t1: ReplaceTypes<['', '', 5], string, 0> = [0, 1, 5];
}




//@ Another capabilites:


type L = ObjectLength<ObjType>;                 // 3
var ks: Sequence<L>[number] = 2                 // 0 | 1 | 2
var ks: Enumerate<L> = 2                        // 0 | 1 | 2




