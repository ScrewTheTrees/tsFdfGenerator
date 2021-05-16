import {StringStream} from "../StringStream";
import {FrameControlBase, FrameControlBaseArgs} from "./FrameControlBase";


export type FrameButtonArgs = FrameControlBaseArgs & {};

export class FrameButton extends FrameControlBase {
    public constructor(name: string, args?: FrameButtonArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "BUTTON");
        str.pushIndent();
        this.writeCommonData(str);
        this.writeControl(str);

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}