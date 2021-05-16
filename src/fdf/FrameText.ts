import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {FontJustify} from "./subtypes/FontJustify";
import {Color} from "../other/Color";
import {FrameFont} from "./subtypes/FrameFont";
import {Vector2} from "../other/Vector2";


export type FrameDialogArgs = FrameBaseArgs & {
    text?: string,
    frameFont?: FrameFont,
    fontJustificationH?: FontJustify,
    fontJustificationV?: FontJustify,
    fontJustificationCenter?: Vector2,
    fontFlags?: (string | 'FIXEDSIZE'),
    fontColor?: Color,
    fontHighlightColor?: Color,
    fontDisabledColor?: Color,
    fontShadowColor?: Color,
    fontShadowOffset?: Vector2,
};

export class FrameText extends FrameBase {
    public text: string = "";
    public frameFont?: FrameFont;
    public fontJustificationH?: FontJustify; //How the text should expand/align.
    public fontJustificationV?: FontJustify; //Is this even real?
    public fontJustificationCenter?: Vector2;
    public fontShadowOffset?: Vector2;
    public fontFlags?: (string | 'FIXEDSIZE');
    public fontColor?: Color; //RGBA
    public fontHighlightColor?: Color; //RGBA
    public fontDisabledColor?: Color; //RGBA
    public fontShadowColor?: Color; //RGBA

    public constructor(name: string, args?: FrameDialogArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "TEXT");
        str.pushIndent();

        this.writeCommonData(str);

        if (this.fontColor) str.writeIndentation().writeString(`FontColor ${this.fontColor.toString()},\n`);
        if (this.fontHighlightColor) str.writeIndentation().writeString(`FontHighlightColor ${this.fontHighlightColor.toString()},\n`);
        if (this.fontDisabledColor) str.writeIndentation().writeString(`FontDisabledColor ${this.fontDisabledColor.toString()},\n`);
        if (this.fontShadowColor) str.writeIndentation().writeString(`FontShadowColor ${this.fontShadowColor.toString()},\n`);
        if (this.fontShadowOffset) str.writeIndentation().writeString(`FontShadowOffset ${this.fontShadowOffset.toString()},\n`);
        if (this.frameFont) str.writeIndentation().writeString(`FontColor ${this.frameFont.toString()},\n`);
        if (this.fontJustificationCenter) str.writeIndentation().writeString(`FontJustificationOffset ${this.fontJustificationCenter.toString()},\n`);
        if (this.fontJustificationH) str.writeIndentation().writeString(`FontJustificationH ${this.fontJustificationH},\n`);
        if (this.fontJustificationV) str.writeIndentation().writeString(`FontJustificationV ${this.fontJustificationV},\n`);
        if (this.fontFlags) str.writeIndentation().writeString(`FontFlags ${this.fontFlags},\n`);
        str.writeIndentation().writeString(`Text "${this.text}",\n`);

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}