interface ObjectConstructor {
    // defineProperty<T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): T;    
    /**
     * @issue https://github.com/microsoft/TypeScript/issues/42919
     */    
    defineProperty<T extends object, K extends PropertyKey, V, W extends boolean>(o: T, p: K, attributes: GenericPropertyDesc<V, W> & ThisType<any>): Merge<
        T,        
        W extends true ? { [k in K]: V } : { readonly [k in K]: V }
    >;
}

interface GenericPropertyDesc<V = unknown, W extends boolean = false> extends PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;                                                                                                   // enumerable: true;    
    value?: V;
    writable?: W;
    get?(): V;
    set?(v: V): void;
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



