

interface Document{
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: `${K}.${string}`): HTMLElementTagNameMap[K] | null;
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: `${K}#${string}`): HTMLElementTagNameMap[K] | null;
    querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
    querySelector<E extends Element = HTMLElement>(selectors: string): E | null;
}







