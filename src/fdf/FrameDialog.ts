import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {BaseFrames} from "../base/BaseFrames";
import {FrameBackdrop} from "./FrameBackdrop";


export type FrameDialogArgs = FrameBaseArgs & {
    dialogBackdrop?: FrameBackdrop | BaseFrames,
};

export class FrameDialog extends FrameBase {
    public dialogBackdrop?: FrameBackdrop | BaseFrames;

    public constructor(name: string, args?: FrameDialogArgs) {
        super(name, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "DIALOG");
        str.pushIndent();

        this.writeCommonData(str);
        str.writeString(`\n`)
        this.writeDialogBackdrop(str);

        for (let child of this.children) {
            child.writeToString(str);
        }

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }


    private writeDialogBackdrop(str: StringStream) {
        if (this.dialogBackdrop != undefined) {
            if (typeof this.dialogBackdrop == "string") {
                str.writeIndentation().writeString(`DialogBackdrop "${this.dialogBackdrop}",\n`)
            } else {
                str.writeIndentation().writeString(`DialogBackdrop "${this.dialogBackdrop.name}",\n`)
            }
        }
    }
}