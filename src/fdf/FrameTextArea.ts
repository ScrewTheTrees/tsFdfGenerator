import {StringStream} from "../StringStream";
import {FrameControlBase, FrameControlBaseArgs} from "./FrameControlBase";
import {FrameScrollbarType} from "./FrameTypes";


export type FrameTextAreaArgs = FrameControlBaseArgs & {
    TextAreaLineHeight?: number,
    TextAreaLineGap?: number,
    TextAreaInset?: number,
    TextAreaScrollBar?: FrameScrollbarType,
};

export class FrameTextArea extends FrameControlBase {

    public TextAreaLineHeight?: number;
    public TextAreaLineGap?: number;
    public TextAreaInset?: number;
    public TextAreaScrollBar?: FrameScrollbarType;

    public constructor(name: string, args?: FrameTextAreaArgs) {
        super(name);
        this.mergeArgs(args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "EDITBOX");
        str.pushIndent();
        this.writeCommonData(str);
        this.writeControl(str);

        this.writeGeneric(str, this.TextAreaLineHeight, "TextAreaLineHeight");
        this.writeGeneric(str, this.TextAreaLineGap, "TextAreaLineGap");
        this.writeGeneric(str, this.TextAreaInset, "TextAreaInset");
        this.writeFrame(str, this.TextAreaScrollBar, "TextAreaScrollBar");

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}