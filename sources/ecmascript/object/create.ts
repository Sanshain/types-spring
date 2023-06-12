interface ObjectConstructor {
    create(o: object | null): object;    
    create(o: object | null, properties: PropertyDescriptorMap & ThisType<any>): object;
        
    
    // create<T extends object | null>(o: T): T extends Object ? Object : object; - doesn't work as expected
}