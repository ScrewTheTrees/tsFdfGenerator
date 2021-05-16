export const enum ControlStyles {
    AUTOTRACK = "AUTOTRACK",
    HIGHLIGHTONMOUSEOVER = "HIGHLIGHTONMOUSEOVER",
}

export function ControlStylesAll() {
    return new Set([
        ControlStyles.AUTOTRACK,
        ControlStyles.HIGHLIGHTONMOUSEOVER,
    ]);
}