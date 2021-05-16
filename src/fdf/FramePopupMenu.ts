import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {BaseFrames} from "../base/BaseFrames";
import {FrameBackdrop} from "./FrameBackdrop";


export type FramePopupMenuArgs = FrameBaseArgs & {
    popupButtonInset?: number,
    controlBackdrop?: BaseFrames | FrameBackdrop,
    controlDisabledBackdrop?: BaseFrames | FrameBackdrop,

    popupTitleFrame?: BaseFrames | FrameBase,
    popupArrowFrame?: BaseFrames | FrameBase,
    popupMenuFrame?: BaseFrames | FrameBase,
};

export class FramePopupMenu extends FrameBase {
    public popupButtonInset?: number;

    public controlBackdrop?: BaseFrames | FrameBackdrop;
    public controlDisabledBackdrop?: BaseFrames | FrameBackdrop;

    public popupTitleFrame?: BaseFrames | FrameBase;
    public popupArrowFrame?: BaseFrames | FrameBase;
    public popupMenuFrame?: BaseFrames | FrameBase;

    public constructor(name: string, args?: FramePopupMenuArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "POPUPMENU");
        str.pushIndent();

        this.writeCommonData(str);

        if (this.popupButtonInset) str.writeIndentation().writeString(`PopupButtonInset ${this.popupButtonInset},\n`);
        this.writeFrame(str, this.controlBackdrop, "ControlBackdrop");
        this.writeFrame(str, this.controlDisabledBackdrop, "ControlDisabledBackdrop");
        this.writeFrame(str, this.popupTitleFrame, "PopupTitleFrame");
        this.writeFrame(str, this.popupArrowFrame, "PopupArrowFrame");
        this.writeFrame(str, this.popupMenuFrame, "PopupMenuFrame");

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}