
type Spread<A, B> = {
    [K in keyof A | keyof B]: K extends keyof A & keyof B ? (A[K] | B[K]) : K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
    // [K in keyof A | keyof B]: K extends keyof A ? A[K] : (K extends keyof B ? B[K] : never)
};

// // test Spread:
// {
//     let a: Spread<{ a: 1 }, { a: '', b: 1 }>    
// }


/// Events:

interface UIEvent<T extends EventTarget = EventTarget, G extends EventTargets = EventTarget> {
    // readonly target: (EventTarget extends T
    //     ? EventTarget
    //     : T extends Document
    //         ? Document | Node
    //         : T extends Window
    //             ? Node
    //             : Node) | null;
    
    readonly target: (EventTarget extends T
            ? EventTarget
            : T extends infer R extends Window | Document
                ? EventTarget extends G ? (R | Node) : G
                : Node) | null;    
    // readonly target: (EventTarget extends T
    //     ? EventTarget
    //     : Node) | null;
    // readonly target: (EventTarget extends T
    //     ? EventTarget
    //     : Node extends T
    //         ? Node 
    //         : Element) | null;    
    // readonly target: (T extends Window ? Node : T) | null;    
    readonly currentTarget: T | null;     
    
}


type EventTargets = EventTarget | Node | Element | HTMLElement | SVGAElement | Document | Window;


interface MouseEvent<T extends EventTargets = EventTarget, G extends EventTargets = EventTarget> {
    // readonly target: (EventTarget extends T ? EventTarget : Node) | null;
    // readonly target: T extends Window ? T : UIEvent<T>['target'];
    readonly target: (EventTarget extends G ? UIEvent<T>['target'] : G) | null;           
    readonly currentTarget: T | null;    
}


interface KeyboardEvent<T extends EventTargets = EventTarget, G extends EventTargets = EventTarget> {
    // readonly target: (EventTarget extends T ? EventTarget : Node) | null;
    // readonly target: UIEvent<T>['target'];
    readonly target: (EventTarget extends G ? UIEvent<T>['target'] : G) | null; 
    readonly currentTarget: T | null;    
}

interface FocusEvent<T extends EventTargets = Node> {
    readonly currentTarget: T | null;
}

// type GenericEvent<T extends EventTargets = Node> = (KeyboardEvent<T> | MouseEvent<T>) & UIEvent<T>
// type GenericEvent<T extends EventTargets = Node> = (KeyboardEvent<T> | MouseEvent<T>) 

interface Document {
    addEventListener<K extends keyof DocumentEventMap>(
        type: K,
        listener: (this: Document, ev: DocumentEventMap[K] extends KeyboardEvent | MouseEvent ? DocumentEventMap[K] & UIEvent<Document> : DocumentEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions): void;
}



interface Window {
    // onclick: ((this: GlobalEventHandlers, ev: Merge<MouseEvent, { currentTarget: Window }>) => any) | null;
    addEventListener<K extends keyof WindowEventMap, TT extends EventTargets = EventTarget>(
        type: K,
        listener: (
            this: Window,            
            // ev: WindowEventMap[K] extends KeyboardEvent | MouseEvent ? Merge<WindowEventMap[K], UIEvent<Window, T>> : WindowEventMap[K]) => any,
        
            ev: WindowEventMap[K] extends KeyboardEvent | MouseEvent
                ? (Merge<WindowEventMap[K], UIEvent<Window, EventTargets extends TT ? Element : TT>> & { isTrusted: true })
                    | (Merge<WindowEventMap[K], UIEvent<Window, TT>> & { isTrusted: false; })
                : WindowEventMap[K]) => any,
        
        options?: boolean | AddEventListenerOptions): void;     
}


interface HTMLTextAreaElement {
    addEventListener(
        type: 'input',
        listener: (this: HTMLTextAreaElement, ev: InputEvent & UIEvent<HTMLTextAreaElement> & { target: HTMLTextAreaElement }) => any,
        options?: boolean | AddEventListenerOptions): void;
    
    addEventListener(
        type: 'focus',
        listener: (
            this: HTMLTextAreaElement,
            ev: UIEvent<HTMLTextAreaElement> & FocusEvent & { target: HTMLTextAreaElement }) => any,
        options?: boolean | AddEventListenerOptions): void;    
}

interface HTMLInputElement {
    addEventListener(
        type: 'input',
        listener: (
            this: HTMLInputElement,
            ev: HTMLElementEventMap['input'] & Partial<InputEvent & UIEvent<HTMLInputElement>> & { target: HTMLInputElement }) => any,
        options?: boolean | AddEventListenerOptions): void;

    addEventListener(
        type: 'focus',
        listener: (
            this: HTMLInputElement,
            ev: UIEvent<HTMLInputElement> & FocusEvent & { target: HTMLInputElement }) => any,
        options?: boolean | AddEventListenerOptions): void;    
}