/// look up readme section on Object.keys 


// type unsafe = 'unsafe';

interface ObjectConstructor {
    /**
     * Returns the names of the enumerable string properties and methods of an object.
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    // keys<T extends object>(o: T): Array<keyof T> & string[];

    getOwnPropertyNames<T extends object>(o: T): T extends Required<T>
        ? string extends T ? string[] : ReadonlyArray<keyof T>
        : string[];

    keys<T extends object>(o: T): T extends Required<T>
        ? string extends T ? string[] : ReadonlyArray<keyof T>
        : string[];

    entries<T extends object>(o: T): T extends Required<T>
        ? string extends T ? string[] : Array<[keyof T, T[keyof T]]>
        : string[];

    // keys<T extends 'unsafe'|'safe', O extends object>(o: O): T extends 'unsafe' ? Array<keyof O> : string[];

}
