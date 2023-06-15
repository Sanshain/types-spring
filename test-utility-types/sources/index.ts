import { FixedLengthArray } from "type-fest"
import { TaggedUnion } from "type-fest"
import { Merge } from "type-fest"


type ArC = {
    a: 1,
    b: number
}
// Expect: "req" | "reqUndef"
type Keys = FixedLengthArray<'a', 1>
let a: Keys = ['a']









///// utility-types vs types-spring:

// Intersection === Common
// Diff === Diff
// Assign === Merge
// Overwrite == Common . Merge
// UnionToIntersection == UnionToIntersection
// $NonMaybeType ~ IsUnion

// utility-types usefull:

// DeepReadonly - *
// DeepRequired - *
// $Values - *
// 



///// ts-toolbelt vs types-spring:

// Assign == MergeAll                                   //  type ExtendedProps = Assign<Props, [{a: 1}]>;
// SelectKeys - keyof MapType                           // 
// Compulsory = *                                       //  Make that L's fields cannot be Nullable or Optional
// Concat,Diff,Drop,Exclude = /resolved that is not necessary
// ExcludeKeys,Either = ?
// Extract,Take = *                                     // slice for tuple type
// Filter === ArrayFilter
// FilterKeys === ArrayFilter[number]
// Flatten == *                                         // Array.flat
// Group == *
// Zip == *



// Has == ?/useless
// Select = ?/useless                                   // Extract the entries of L that match M





///// ts-toolbelt vs utility-types:

// RequiredKeys === RequiredKeys
// SelectKeys === keyof PickByValue
// WritableKeys === MutableKeys
// Writable === Mutable


//// types-fest vs types-spring vs utility-types:

// MergeDeep ==             *
// RequiredDeep ==          *                   == DeepReadonly
// ReadonlyDeep ==          *                   == DeepRequired
// OptionalKeysOf ~         !NonNullableKeys    == 
// Spread ==                Merge ==
// Merge ==                 ~Merge
// IsEqual ==               ?/usefu?
// MultidimensionalArray == *
// MultidimensionalReadonlyArray == *
// FixedLengthArray ==      ConstrainArray