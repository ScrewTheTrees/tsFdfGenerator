import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {BaseFrames} from "../base/BaseFrames";
import {FrameBackdrop} from "./FrameBackdrop";


export type FrameDialogArgs = FrameBaseArgs & {
    DialogBackdrop?: FrameBackdrop | BaseFrames,
};

export class FrameDialog extends FrameBase {
    public DialogBackdrop?: FrameBackdrop | BaseFrames;

    public constructor(name: string, args?: FrameDialogArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "DIALOG");
        str.pushIndent();

        this.writeCommonData(str);
        this.writeFrame(str, this.DialogBackdrop, "DialogBackdrop");

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}