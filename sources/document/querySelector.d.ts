

type HTMLTagNames = keyof HTMLElementTagNameMap;


type HTMLSelector<S extends string> = S extends `${string},${string}`
    ? Element
    : S extends `${string}${` ` | `~`}${infer A extends string}` 
        ? S extends (`${string}~${infer H extends HTMLTagNames}` | `${string} ${infer H extends HTMLTagNames}`) 
            ? HTMLElementTagNameMap[H] 
            : A extends `${string}${` ` | `]`}${string}`
                ? Element
                : A extends (`${infer H extends HTMLTagNames}${`.` | `#`}${string}`) 
                    ? HTMLElementTagNameMap[H]
                    : Element
        : S extends (`${infer H extends HTMLTagNames}${`.` | `#`}${string}`) | (`${string}${`>` | `+`}${infer H extends HTMLTagNames}`) 
            ? HTMLElementTagNameMap[H]
            : S extends (`${string}${`>` | `+`}${infer H extends HTMLTagNames}${`.` | `#`}${string}`)
                ? HTMLElementTagNameMap[H]
                : Element


interface ParentNode {
    /** Returns the first element that is a descendant of node that matches selectors. */    
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
    querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
    // /** @deprecated */
    querySelector<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): HTMLElementDeprecatedTagNameMap[K] | null;        
    querySelector<S extends string>(selector: S): HTMLSelector<S> | null    

    /** Returns all element descendants of node that match selectors. */
    
    querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
    querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;    
    /** @deprecated */
    querySelectorAll<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
    querySelectorAll<S extends string>(selector: S): NodeListOf<HTMLSelector<S>> | null;

    // querySelector<E extends Element = Element>(selectors: string): E;
    // querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;            

    
    /// drop because of ^5.0.0 required:
    
    // querySelector<K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;     
    // querySelectorAll<K extends keyof MathMLElementTagNameMap>(selectors: K): NodeListOf<MathMLElementTagNameMap[K]>;
}


