import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";


export type FrameGlueCheckboxArgs = FrameBaseArgs & {};

export class FrameScrollBar extends FrameBase {
    public constructor(name: string, args?: FrameGlueCheckboxArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "SCROLLBAR");
        str.pushIndent();

        this.writeCommonData(str);


        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}