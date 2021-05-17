import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {StringStream} from "../StringStream";

export type FrameTextureArgs = FrameBaseArgs & {
    File?: string,
};

/**
 * These are unnamed, so take great care in using them.
 */
export class FrameTexture extends FrameBase {
    public File?: string;

    public constructor(args?: FrameTextureArgs) {
        super("");
        Object.assign(this, args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeTextureHeader(str);
        str.pushIndent();
        this.writeCommonData(str);

        this.writeGeneric(str, this.File, "File");

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }

    public writeTextureHeader(str: StringStream) {
        str.writeIndentation();
        str.writeString(`Texture`);
        if (this.Name.length > 0) str.writeString(` "${this.Name}"`);
        this.writeInheritsFrom(str);
        str.writeLine(` {`);
    }
}



