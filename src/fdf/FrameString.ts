import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {StringStream} from "../StringStream";
import {Font} from "./subtypes/Font";

export type FrameStringArgs = FrameBaseArgs & {
    Font?: Font,
    TextLength?: number,
};

export class FrameString extends FrameBase {
    public Font?: Font;
    public TextLength?: number;
    public constructor(name?: string, args?: FrameStringArgs) {
        super(name || "");
        Object.assign(this, args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeStringHeader(str);
        str.pushIndent();
        this.writeCommonData(str);

        if (this.Font) this.Font.compileToStringStream(str);
        this.writeGeneric(str, this.TextLength, "TextLength");

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }

    public writeStringHeader(str: StringStream) {
        str.writeIndentation();
        str.writeString(`String "${this.Name}"`);
        this.writeInheritsFrom(str);
        str.writeLine(` {`);
    }
}