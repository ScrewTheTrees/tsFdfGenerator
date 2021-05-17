import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";


export type FrameFrameArgs = FrameBaseArgs & {};

export class FrameFrame extends FrameBase {
    public constructor(name: string, args?: FrameFrameArgs) {
        super(name);
        Object.assign(this, args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "FRAME");
        str.pushIndent();

        this.writeCommonData(str);
        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}