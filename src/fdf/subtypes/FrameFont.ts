import {BaseFonts} from "../../base/BaseFonts";
import {IWriteAble} from "../../IWriteAble";
import {StringStream} from "../../StringStream";

export class FrameFont implements IWriteAble {
    public font: BaseFonts;
    public size: number;
    public unknown: string;

    constructor(font: BaseFonts, size: number, unknown: string) {
        this.font = font;
        this.size = size;
        this.unknown = unknown;
    }
    public compileToStringStream(str: StringStream) {
        str.writeIndentation().writeLine(`FrameFont "${this.font}", ${this.size}, "${this.unknown}",`);
    }
}