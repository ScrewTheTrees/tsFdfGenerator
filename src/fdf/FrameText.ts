import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";

export type FrameTextArgs = FrameBaseArgs & {
};

export class FrameText extends FrameBase {
    public constructor(name: string, args?: FrameTextArgs) {
        super(name);
        this.mergeArgs(args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "TEXT");
        str.pushIndent();
        this.writeCommonData(str);

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}