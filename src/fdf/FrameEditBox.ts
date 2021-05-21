import {StringStream} from "../StringStream";
import {FrameControlBase, FrameControlBaseArgs} from "./FrameControlBase";
import {RGBColor} from "../other/RGBColor";


export type FrameEditBoxArgs = FrameControlBaseArgs & {
    EditBorderSize?: number,
    EditCursorColor?: RGBColor,
};

export class FrameEditBox extends FrameControlBase {

    public EditBorderSize?: number;
    public EditCursorColor?: RGBColor;

    public constructor(name: string, args?: FrameEditBoxArgs) {
        super(name);
        this.mergeArgs(args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "EDITBOX");
        str.pushIndent();
        this.writeCommonData(str);
        this.writeControl(str);

        this.writeGeneric(str, this.EditBorderSize, "EditBorderSize");
        this.writeColor(str, this.EditCursorColor, "EditCursorColor");

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }


}