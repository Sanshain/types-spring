
type PropertiesMapType<T extends Record<string, Record<F, unknown>>, F extends string> = {
    [K in keyof T]: T[K][F] extends (...args: any) => any ? ReturnType<T[K][F]> : T[K][F]
}

type ReadonlyMapType<T extends Record<string, Record<F, unknown>>, F extends string> = {
    readonly [K in keyof T]: T[K][F] extends (...args: any) => any ? ReturnType<T[K][F]> : T[K][F]
}

type MapType<T extends Record<PropertyKey, Record<F | R, unknown>>, F extends string, R extends string> = 
    {
        readonly [K in keyof T as T[K][R] extends false ? K : never]: T[K][F]
    } & {
        [K in keyof T as T[K][R] extends true ? K : never]: T[K][F]
    }


/// MapType test:

// {
//     type VS = {
//         a: {
//             value: number,
//             writable: false
//         },
//         b: {
//             value: string,
//             writable: true,
//         }
//     }

//     function func1(yyy: MapType<VS, "value", "writable">) {
//         yyy.b = ''
//         yyy.a = 1
//     }
// }



interface ObjectConstructor {        
    // defineProperties<T>(o: T, properties: PropertyDescriptorMap & ThisType<any>): T;
    defineProperties<T extends object, A extends Record<PropertyKey, PropertyDescriptor & { value: unknown, writable: boolean }>>(o: T, attributes: A & ThisType<any>): Merge<
        T,
        MapType<A, "value", "writable">
    >;
    defineProperties<T extends object, A extends Record<PropertyKey, PropertyDescriptor & { value: unknown }>>(o: T, attributes: A & ThisType<any>): Merge<
        T,
        ReadonlyMapType<A, "value">
    >;
    defineProperties<T extends object, A extends Record<PropertyKey, PropertyDescriptor & { get: unknown, set: unknown }>>(o: T, attributes: A & ThisType<any>): Merge<
        T,
        PropertiesMapType<A, "get">
    >    
    defineProperties<T extends object, A extends Record<PropertyKey, PropertyDescriptor & { get: unknown }>>(o: T, attributes: A & ThisType<any>): Merge<
        T,
        ReadonlyMapType<A, "get">
    >
}








// type WidenType<T> = T extends string
//     ? string
//     : T extends number
//         ? number
//         : T extends boolean
//             ? boolean
//             : T extends null
//                 ? object
//                 : T extends undefined
//                     ? unknown
//                     : T



