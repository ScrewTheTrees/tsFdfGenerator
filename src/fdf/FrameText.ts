import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {FontJustify} from "./FontJustify";
import {Color} from "../other/Color";


export type FrameDialogArgs = FrameBaseArgs & {
    fontJustificationH?: FontJustify, //How the text should expand/align.
    fontJustificationV?: FontJustify, //Is this even real?
    text?: string,
    fontColor?: Color, //ARGB, BGRA or RGBA? no clue currently but i suspect RGBA.
};
export class FrameText extends FrameBase {
    public fontJustificationH?: FontJustify;
    public fontJustificationV?: FontJustify;
    public text: string = "";
    public fontColor?: Color;

    public constructor(name: string, args?: FrameDialogArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "TEXT");
        str.pushIndent();

        this.writeCommonData(str);

        if (this.fontColor) str.writeIndentation().writeString(`FontColor ${this.fontColor.toString()},\n`)
        if (this.fontJustificationH) str.writeIndentation().writeString(`FontJustificationH ${this.fontJustificationH},\n`)
        if (this.fontJustificationV) str.writeIndentation().writeString(`FontJustificationV ${this.fontJustificationV},\n`)
        str.writeIndentation().writeString(`Text "${this.text}",\n`)

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}