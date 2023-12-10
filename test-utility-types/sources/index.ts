import { FixedLengthArray } from "type-fest"
import { TaggedUnion } from "type-fest"
import { Merge } from "type-fest"
import { ListOf } from "ts-toolbelt/out/Object/ListOf"
import { Either } from "ts-toolbelt/out/Object/_api"
import { Filter } from "ts-toolbelt/out/List/Filter";       // !! ts-toolbelt have very perplexing types for understanding, insufficiently documented web-site and modest readme

import type { InvariantOf, Opaque } from 'type-fest';

// In covariance (default)



// type O = (a: string, k: number, o: object, ...args: unknown[]) => void;

// type OO = Parameters<O>

// type FF = Filter<Parameters<O>, unknown>
// let rere: FF = ['', 1, {}]






// ts-toolbelt   - >200 types         // but most of them are very similar to each other    - 5.9k
// types-fest    - =125 types                                                               - 11.k
// utility-types - =57  types                                                               - 5.0k



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



//// types-fest vs              types-spring vs                     utility-types:

// MergeDeep ==                 -                                   == -
// RequiredDeep ==              -                                   == DeepReadonly
// ReadonlyDeep ==              -                                   == DeepRequired
// OptionalKeysOf ~             !NonNullableKeys                    ==
// Spread ==                    Merge                               ==
// Merge ==                     ~Merge                              ==
// IsEqual ==                   ?/__use__/?                         ==
// MultidimensionalArray ==     -                                   ==
// MultidimensionalReadonlyArray == -                               ==
// FixedLengthArray ==          ConstrainArray                      ==
//                              KeysMatching                        == keyof PickByValue
//                              Exclude<k T, KeysMatching<T, V>>    == keyof OmitByValue
// Writable ==                   -                                  ==                                      // remove all readonly fields
// OverrideProperties  ==       Spread                              ==
// RequireExactlyOne ==         OptionalExceptOne                   ==
//                              ?/only service usage/?              == Intersection                         // exists in alt branch of types-spring (get dublicate fields)
//                              Diff                                == Diff
//                              Omit<T, Diff<T>>                    == Subtract
// Spread                       Spread                              == ~Overwrite
// Spread                       Spread                              == Assign


