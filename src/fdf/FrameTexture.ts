import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {StringStream} from "../StringStream";
import {Vector4} from "../other/Vector4";

export type FrameTextureArgs = FrameBaseArgs & {
    File?: string,
    TexCoord?: Vector4,
    AlphaMode?: string,
};

/**
 * These are unnamed, so take great care in using them.
 */
export class FrameTexture extends FrameBase {
    public File?: string;
    public TexCoord?: Vector4;
    public AlphaMode?: string;

    public constructor(args?: FrameTextureArgs) {
        super("");
        Object.assign(this, args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeTextureHeader(str);
        str.pushIndent();
        this.writeCommonData(str);

        this.writeGeneric(str, this.File, "File");
        this.writeVector(str, this.TexCoord, "TexCoord");
        this.writeGeneric(str, this.AlphaMode, "AlphaMode");

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



