// interface ObjectConstructor {
//     /**
//      * Returns the names of the enumerable string properties and methods of an object.
//      * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
//      */
//     // keys<T extends object>(o: T): Array<keyof T> & string[];
    
//     getOwnPropertyNames<T extends object>(o: T): T extends Required<T> ? Array<keyof T> : string[];
    
//     keys<T extends object>(o: T): T extends Required<T> ? Array<keyof T> : string[];
//     entries<T extends object>(o: T): Array<[keyof T, T[keyof T]]>;
// }


// type A = {
//     a?: string,
//     b: number
// }
// let aa: A = {
//     a: '',
//     b: 1
// }
// const rr = Object.keys(aa)
