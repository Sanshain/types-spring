
/// Events:

interface UIEvent<T extends EventTarget = EventTarget> {
    readonly target: Node | null;
    readonly currentTarget: T | null; 
    // readonly target: (T extends Window ? Node : T) | null;
}

type EventTargets = Node | Element | HTMLElement | SVGAElement | Document | Window;


interface MouseEvent<T extends EventTargets = Node> {
    readonly currentTarget: T | null;    
}


interface KeyboardEvent<T extends EventTargets = Node> {
    readonly currentTarget: T | null;    
}

interface FocusEvent<T extends EventTargets = Node> {
    readonly currentTarget: T | null;
}

type GenericEvent<T extends EventTargets = Node> = KeyboardEvent<T> | MouseEvent<T> 


/// addEventListener:


interface Document {
    addEventListener<K extends keyof DocumentEventMap>(
        type: K, listener: (this: Document, ev: DocumentEventMap[K] extends GenericEvent ? GenericEvent<Document> : DocumentEventMap[K]
    ) => any, options?: boolean | AddEventListenerOptions): void;
}

interface Window{
    addEventListener<K extends keyof WindowEventMap>(
        type: K, listener: (this: Window, ev: WindowEventMap[K] extends GenericEvent ? GenericEvent<Window> : WindowEventMap[K]
    ) => any, options?: boolean | AddEventListenerOptions): void;    
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



