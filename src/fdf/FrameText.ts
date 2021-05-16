import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {FontJustify} from "./subtypes/FontJustify";
import {Color} from "../other/Color";
import {FrameFont} from "./subtypes/FrameFont";
import {Vector2} from "../other/Vector2";


export type FrameDialogArgs = FrameBaseArgs & {
    Text?: string,
    FrameFont?: FrameFont,
    FontJustificationH?: FontJustify,
    FontJustificationV?: FontJustify,
    FontJustificationCenter?: Vector2,
    FontFlags?: (string | 'FIXEDSIZE'),
    FontColor?: Color,
    FontHighlightColor?: Color,
    FontDisabledColor?: Color,
    FontShadowColor?: Color,
    FontShadowOffset?: Vector2,
};

export class FrameText extends FrameBase {
    public Text: string = "";
    public FrameFont?: FrameFont;
    public FontJustificationH?: FontJustify; //How the text should expand/align.
    public FontJustificationV?: FontJustify; //Is this even real?
    public FontJustificationCenter?: Vector2;
    public FontFlags?: (string | 'FIXEDSIZE');
    public FontColor?: Color; //RGBA
    public FontHighlightColor?: Color; //RGBA
    public FontDisabledColor?: Color; //RGBA
    public FontShadowColor?: Color; //RGBA
    public FontShadowOffset?: Vector2;

    public constructor(name: string, args?: FrameDialogArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "TEXT");
        str.pushIndent();

        this.writeCommonData(str);

        if (this.FontColor) str.writeIndentation().writeString(`FontColor ${this.FontColor.toString()},\n`);
        if (this.FontHighlightColor) str.writeIndentation().writeString(`FontHighlightColor ${this.FontHighlightColor.toString()},\n`);
        if (this.FontDisabledColor) str.writeIndentation().writeString(`FontDisabledColor ${this.FontDisabledColor.toString()},\n`);
        if (this.FontShadowColor) str.writeIndentation().writeString(`FontShadowColor ${this.FontShadowColor.toString()},\n`);
        if (this.FontShadowOffset) str.writeIndentation().writeString(`FontShadowOffset ${this.FontShadowOffset.toString()},\n`);
        if (this.FrameFont) str.writeIndentation().writeString(`FontColor ${this.FrameFont.toString()},\n`);
        if (this.FontJustificationCenter) str.writeIndentation().writeString(`FontJustificationOffset ${this.FontJustificationCenter.toString()},\n`);
        if (this.FontJustificationH) str.writeIndentation().writeString(`FontJustificationH ${this.FontJustificationH},\n`);
        if (this.FontJustificationV) str.writeIndentation().writeString(`FontJustificationV ${this.FontJustificationV},\n`);
        if (this.FontFlags) str.writeIndentation().writeString(`FontFlags ${this.FontFlags},\n`);
        str.writeIndentation().writeString(`Text "${this.Text}",\n`);

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}