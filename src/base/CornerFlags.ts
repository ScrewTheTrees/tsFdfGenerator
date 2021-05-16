export const enum CornerFlags {
    TOP_LEFT = "UL",
    TOP_RIGHT = "UR",
    BOTTOM_LEFT = "BL",
    BOTTOM_RIGHT = "BR",
    TOP = "T",
    LEFT = "L",
    BOTTOM = "B",
    RIGHT = "R",
}

export function CornerFlagsAll() {
    return new Set([
        CornerFlags.TOP_LEFT,
        CornerFlags.TOP_RIGHT,
        CornerFlags.BOTTOM_LEFT,
        CornerFlags.BOTTOM_RIGHT,
        CornerFlags.TOP,
        CornerFlags.LEFT,
        CornerFlags.BOTTOM,
        CornerFlags.RIGHT,
    ]);
}