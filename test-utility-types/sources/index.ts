import { FixedLengthArray } from "type-fest"
import { TaggedUnion } from "type-fest"
import { Merge } from "type-fest"
import { ListOf } from "ts-toolbelt/out/Object/ListOf"
import { Either, ExcludeKeys, IntersectKeys, Replace } from "ts-toolbelt/out/Object/_api"
// import { Merge } from "ts-toolbelt/out/Object/_api"
// import { Filter } from "ts-toolbelt/out/Object/Filter";     
import { Group } from "ts-toolbelt/out/List/Group";
import { Zip } from "ts-toolbelt/out/List/Zip";
import { Extract } from "ts-toolbelt/out/List/Extract";
import { Take } from "ts-toolbelt/out/List/Take";
import { Filter } from "ts-toolbelt/out/List/Filter";       // !! ts-toolbelt have very perplexing types for understanding, insufficiently documented web-site and modest readme
import { Flatten } from "ts-toolbelt/out/List/Flatten"; 
import { Compulsory } from "ts-toolbelt/out/Object/Compulsory";       

import type { InvariantOf, Opaque } from 'type-fest';
import { SharedUnionFieldsDeep, OptionalKeysOf } from 'type-fest';
import type { MultidimensionalArray } from 'type-fest';
import { Common } from "types-spring"
import { RequireExactlyOne } from "type-fest"
import { MergeDeep } from "type-fest"
import { BuiltIn } from "ts-toolbelt/out/Misc/_api"
import { ReadonlyDeep } from "type-fest"
import { Assign, DeepReadonly } from "utility-types"
import { O } from 'ts-toolbelt'


// import type { SharedUnionFieldsDeep } from 'type-fest';



// type Pet2 = 'dog' | 'cat' | string // LiteralUnion<'dog' | 'cat', string>;
// type Pet2 = 'dog' | 'cat' | string & {}


// In covariance (default)



// type O = (a: string, k: number, o: object, ...args: unknown[]) => void;

// type OO = Parameters<O>

// type FF = Filter<Parameters<O>, unknown>
// let rere: FF = ['', 1, {}]


type OO = {
    name: string,
    user: {
        lastname?: string,
        phone: string,
        email?: string
    }
}

type PP = {
    str: string,
    user: {
        phone: number,
        address: ''   
    }
}

type MM = Replace<PP, string, number> 

// let m: MM = {
//     str: '',
//     name: '',
//     user: {
//         address: '',
//         phone: ''
//     }
// }


// type OO = RequireExactlyOne<{ 
//     name: string,
//     lastname?: string,
//     phone: string,
//     email?: string    
// }>
// let o: OO = {name: ''}
// type OO = Either<{ a: 1, b: 1, aa: 1 }, 'a' | 'aa'>
// type F1l = Compulsory<{ a?: 1, b: 1 | null, '2': 2, '1': 3 }>
// type UserInfo = NonNullable<{
//     name: string, lastname?: string, email?: string, address: {
//         street: string,
//         number?: number
//     } | null
// }>

type Ar = [1, 2, 3, [4, 5]]
const ar = [1, 2, 3, [4, 5]] as const



// type FF = Filter<[1,2,3,'5'], string>


// ts-toolbelt   - >200 types         // but most of them are very similar to each other    - 5.9k => 6.3k
// types-fest    - =125 types                                                               - 11.k => 12.9k
// utility-types - =57  types                                                               - 5.0k => 5.2k




///// utility-types vs types-spring:

// Intersection === Common
// Diff === Diff
// Assign === Merge
// Overwrite == Common . Merge
// UnionToIntersection == IntersectUnion
// $NonMaybeType ~ IsUnion

// utility-types usefull:

// DeepReadonly - *
// DeepRequired - *
// $Values - *
//



///// ts-toolbelt vs types-spring:


// Assign       === MergeAll                                    //  type ExtendedProps = Assign<Props, [{a: 1}]>;
// SelectKeys   === keyof MapType
// Compulsory   === -----                                       // Make that L's fields cannot be Nullable or Optional (Pointed Required type)
// Extract,Take === -----                                       // slice(a,b) and slice(0, n) for tuple type (useless)
// Filter       === ArrayFilter
// FilterKeys   === ArrayFilter[number]
// Flatten      === -                                           // type like in js Array.flat
// Group        === -                                           // very cool
// Zip          === -                                           // very cool
// -            === ObjectLength
// -            === OptionalExceptOne
// -            === ArrayKeys*
// Diff         === Diff






// Either       === ???                                         // ? - it is not clear what it does and for what

/// **Array:**

// Concat                                                       // ! ?useless : - : rare needly
// Drop                                                         // ! ?useless : like slice(n)

/// **Object:**

// Has ==                                                       // < ?useless : - : cool, but very useless
// Select ==                                                    // < ?useless : Extract the fields of O that match M





///// ts-toolbelt vs utility-types:

// RequiredKeys === RequiredKeys
// SelectKeys   === keyof PickByValue
// WritableKeys === MutableKeys
// Writable     === Mutable


let r: O.Merge<{ a: 1, c: string }, { b: 2, c: 2 }> & {} = {
    a: 1,
    b: 2,  
    c: ''
}
//// types-fest vs              types-spring vs                     utility-types:          ts-toolbelt

// MergeDeep ==                 -                                   == -                    == Merge<'deep'>
// RequiredDeep ==              -                                   == DeepRequired         == Required<'deep'>
// ReadonlyDeep ==              -                                   == DeepReadonly         == Readonly<'deep'>
// OptionalKeysOf ~             ~!NonNullableKey                    == OptionalKeys         == OptionalKeys
// RequiredKeysOf               ~NonNullableKey                     == ~RequiredKeys         == ~CompulsoryKeys | RequiredKeys
// Spread ==                    Merge                               == --                   == --
// Merge ==                     ~Merge                              == Assign               == Assign
// IsEqual ==                   ?/__use__/?                         == --                   == Equals
// MultidimensionalArray ==     -                                   == --                   == --
// MultidimensionalReadonlyArray == -                               == --                   == --
// --                            --                                 == --                   == Zip
// FixedLengthArray ==          ConstrainArray                      == --                   == ?
//                              KeysMatching                        == keyof PickByValue    == ?
//                              Exclude<k T, KeysMatching<T, V>>    == keyof OmitByValue    == ~ExcludeKeys
// Writable ==                   -                                  ==                      == --                // remove all readonly fields
// --                           -                                   == Mutable              == Writable          // makes fields writable
// OverrideProperties  ==       Spread                              == Overwrite            == ~Merge
// RequireAtLeastOne            OptionalExceptOne                   == -                    == -
// RequireExactlyOne ==         OneOf                               == -                    == -
//                              ?/only service usage/?              == Intersection                         // exists in alt branch of types-spring (get dublicate fields)
//                              Diff                                == Diff                 == Diff
//                              Omit<T, Diff<T>>                    == Subtract             == Extract (the same name as original different type)
// SetFieldType                 ReplaceType                         == -                    == Replace


// ... draft...
// Spread                       Spread                              == ~Overwrite           == ~Merge

