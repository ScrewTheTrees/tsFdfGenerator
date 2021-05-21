import {StringStream} from "../StringStream";
import {FrameHighlightType} from "./FrameTypes";
import {FrameControlBase, FrameControlBaseArgs} from "./FrameControlBase";


export type FrameGlueCheckboxArgs = FrameControlBaseArgs & {
    CheckBoxCheckHighlight?: FrameHighlightType,
    CheckBoxDisabledCheckHighlight?: FrameHighlightType,
};

export class FrameGlueCheckbox extends FrameControlBase {

    public CheckBoxCheckHighlight?: FrameHighlightType;
    public CheckBoxDisabledCheckHighlight?: FrameHighlightType;

    public constructor(name: string, args?: FrameGlueCheckboxArgs) {
        super(name);
        this.mergeArgs(args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "GLUECHECKBOX");
        str.pushIndent();
        this.writeCommonData(str);
        this.writeControl(str);

        this.writeFrame(str, this.CheckBoxCheckHighlight, "CheckBoxCheckHighlight");
        this.writeFrame(str, this.CheckBoxDisabledCheckHighlight, "CheckBoxDisabledCheckHighlight");

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}