import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";

export type FrameMenuArgs = FrameBaseArgs & {
};

export class FrameMenu extends FrameBase {
    public constructor(name: string, args?: FrameMenuArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "MENU");
        str.pushIndent();

        this.writeCommonData(str);

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}