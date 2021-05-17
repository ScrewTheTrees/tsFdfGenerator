import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";

export type FrameDialogArgs = FrameBaseArgs & {
    Text?: string,
};

export class FrameText extends FrameBase {
    public Text?: string;

    public constructor(name: string, args?: FrameDialogArgs) {
        super(name);
        Object.assign(this, args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "TEXT");
        str.pushIndent();

        this.writeCommonData(str);

        this.writeGeneric(str, this.Text, "Text");

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}