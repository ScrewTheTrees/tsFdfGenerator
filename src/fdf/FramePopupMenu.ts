import {StringStream} from "../StringStream";
import {FrameControlBase, FrameControlBaseArgs} from "./FrameControlBase";
import {FrameType} from "./FrameTypes";


export type FramePopupMenuArgs = FrameControlBaseArgs & {
    PopupButtonInset?: number,
    PopupTitleFrame?: FrameType,
    PopupArrowFrame?: FrameType,
    PopupMenuFrame?: FrameType,
};

export class FramePopupMenu extends FrameControlBase {
    public PopupButtonInset?: number;

    public PopupTitleFrame?: FrameType;
    public PopupArrowFrame?: FrameType;
    public PopupMenuFrame?: FrameType;

    public constructor(name: string, args?: FramePopupMenuArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "POPUPMENU");
        str.pushIndent();

        this.writeCommonData(str);
        this.writeControl(str);

        if (this.PopupButtonInset) str.writeIndentation().writeString(`PopupButtonInset ${this.PopupButtonInset},\n`);
        this.writeFrame(str, this.PopupTitleFrame, "PopupTitleFrame");
        this.writeFrame(str, this.PopupArrowFrame, "PopupArrowFrame");
        this.writeFrame(str, this.PopupMenuFrame, "PopupMenuFrame");

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}