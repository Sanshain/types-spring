///<reference path='./cloneNode.d.ts' />
///<reference path='./currentTarget.ts' />
///<reference path='./querySelector.d.ts' />




// interface HTMLElement {
//     onclick: ((ev: MouseEvent<this>) => any) | null;
//     // onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
// }

// interface HTMLDivElement extends HTMLElement {
//     // addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
//     addEventListener<K extends keyof HTMLElementEventMap>(
//         type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K] extends MouseEvent ? MouseEvent<HTMLDivElement> & HTMLElementEventMap[K] : HTMLElementEventMap[K]
//         ) => any, options?: boolean | AddEventListenerOptions): void;
// }


// interface HTMLElement {
//     // addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
//     addEventListener<K extends keyof HTMLElementEventMap>(
//         type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K] extends MouseEvent ? MouseEvent<HTMLElement> & HTMLElementEventMap[K] : HTMLElementEventMap[K]
//         ) => any, options?: boolean | AddEventListenerOptions): void;
// }