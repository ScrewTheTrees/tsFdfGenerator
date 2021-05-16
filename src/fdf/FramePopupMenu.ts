import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {BaseFrames} from "../base/BaseFrames";
import {FrameBackdrop} from "./FrameBackdrop";


export type FramePopupMenuArgs = FrameBaseArgs & {
    PopupButtonInset?: number,
    ControlBackdrop?: BaseFrames | FrameBackdrop,
    ControlDisabledBackdrop?: BaseFrames | FrameBackdrop,

    PopupTitleFrame?: BaseFrames | FrameBase,
    PopupArrowFrame?: BaseFrames | FrameBase,
    PopupMenuFrame?: BaseFrames | FrameBase,
};

export class FramePopupMenu extends FrameBase {
    public PopupButtonInset?: number;

    public ControlBackdrop?: BaseFrames | FrameBackdrop;
    public ControlDisabledBackdrop?: BaseFrames | FrameBackdrop;

    public PopupTitleFrame?: BaseFrames | FrameBase;
    public PopupArrowFrame?: BaseFrames | FrameBase;
    public PopupMenuFrame?: BaseFrames | FrameBase;

    public constructor(name: string, args?: FramePopupMenuArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "POPUPMENU");
        str.pushIndent();

        this.writeCommonData(str);

        if (this.PopupButtonInset) str.writeIndentation().writeString(`PopupButtonInset ${this.PopupButtonInset},\n`);
        this.writeFrame(str, this.ControlBackdrop, "ControlBackdrop");
        this.writeFrame(str, this.ControlDisabledBackdrop, "ControlDisabledBackdrop");
        this.writeFrame(str, this.PopupTitleFrame, "PopupTitleFrame");
        this.writeFrame(str, this.PopupArrowFrame, "PopupArrowFrame");
        this.writeFrame(str, this.PopupMenuFrame, "PopupMenuFrame");

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}