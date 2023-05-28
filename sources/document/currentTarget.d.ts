interface UIEvent {
    readonly target: Node | null;
}

type EventTargets = Node | HTMLElement | SVGAElement | Window;


interface MouseEvent<T extends EventTargets = Node> {
    readonly currentTarget: T | null;
    readonly target: (T extends Window ? Node : T) | null;
}

interface KeyboardEvent<T extends EventTargets = Node> {
    readonly currentTarget: T | null;
    readonly target: (T extends Window ? Node : T) | null;
}
