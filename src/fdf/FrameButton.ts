import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";


export type FrameButtonArgs = FrameBaseArgs & {
};

export class FrameButton extends FrameBase {
    public constructor(name: string, args?: FrameButtonArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "BUTTON");
        str.pushIndent();

        this.writeCommonData(str);

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}