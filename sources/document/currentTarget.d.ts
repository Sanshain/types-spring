interface UIEvent {
    readonly target: Node | null;
}

type TargetEvent = Node | HTMLElement | SVGAElement | Window;


interface MouseEvent<T extends TargetEvent = Node> {
    readonly currentTarget: T | null;
    readonly target?: T extends Window ? Node : T;
}

interface KeyboardEvent<T extends TargetEvent = Node> {
    readonly currentTarget: T | null;
    readonly target?: T extends Window ? Node : T;
}