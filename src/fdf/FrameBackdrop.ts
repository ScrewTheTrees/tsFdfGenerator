import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {CornerFlags} from "./subtypes/CornerFlags";
import {Vector4} from "../other/Vector4";
import {StringStream} from "../StringStream";

export type FrameBackdropTypes = FrameBaseArgs & {
    BackdropBackground?: string,
    BackdropCornerFlags?: Set<CornerFlags>,
    BackdropCornerSize?: number,
    BackdropBackgroundSize?: number,
    BackdropBackgroundInsets?: Vector4,
    BackdropEdgeFile?: string,

    BackdropTileBackground?: boolean,
    BackdropBlendAll?: boolean,
};

export class FrameBackdrop extends FrameBase {
    public BackdropBackground?: string;
    public BackdropCornerFlags: Set<CornerFlags> = new Set();
    public BackdropCornerSize?: number;
    public BackdropBackgroundSize?: number;
    public BackdropBackgroundInsets?: Vector4;
    public BackdropEdgeFile?: string;

    //Flags
    public BackdropTileBackground: boolean = false;
    public BackdropBlendAll: boolean = false;

    public constructor(name: string, args?: FrameBackdropTypes) {
        super(name);
        this.mergeArgs(args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "BACKDROP");
        str.pushIndent();
        this.writeCommonData(str);

        if (this.BackdropTileBackground) str.writeIndentation().writeLine(`BackdropTileBackground,`);
        if (this.BackdropBlendAll) str.writeIndentation().writeLine(`BackdropBlendAll,`);
        this.writeSet(str, this.BackdropCornerFlags, "BackdropCornerFlags");
        if (this.BackdropBackground) str.writeIndentation().writeLine(`BackdropBackground "${this.BackdropBackground}",`);

        this.writeGeneric(str, this.BackdropCornerSize, "BackdropCornerSize");
        this.writeGeneric(str, this.BackdropBackgroundSize, "BackdropBackgroundSize");
        this.writeVector(str, this.BackdropBackgroundInsets, "BackdropBackgroundInsets");
        this.writeGeneric(str, this.BackdropEdgeFile, "BackdropEdgeFile");

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString("}\n");
    }
}