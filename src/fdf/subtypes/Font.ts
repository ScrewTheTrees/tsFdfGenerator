import {BaseFonts} from "../../base/BaseFonts";
import {IWriteAble} from "../../IWriteAble";
import {StringStream} from "../../StringStream";

export class Font implements IWriteAble {
    public font: BaseFonts;
    public size: number;

    constructor(font: BaseFonts, size: number) {
        this.font = font;
        this.size = size;
    }
    public compileToStringStream(str: StringStream) {
        str.writeIndentation().writeLine(`Font "${this.font}", ${this.size},`);
    }
}