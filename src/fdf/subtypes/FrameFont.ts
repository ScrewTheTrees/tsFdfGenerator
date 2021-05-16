import {BaseFonts} from "../../base/BaseFonts";

export class FrameFont {
    public font: BaseFonts;
    public size: number;
    public unknown: string;

    constructor(font: BaseFonts, size: number, unknown: string) {
        this.font = font;
        this.size = size;
        this.unknown = unknown;
    }
    public toString() {
        return `FrameFont ${this.font}, ${this.size}, ${this.unknown},\n`;
    }
}