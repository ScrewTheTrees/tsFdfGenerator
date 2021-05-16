import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {BaseBackgrounds} from "../base/BaseBackgrounds";
import {CornerFlags} from "../base/CornerFlags";
import {Vector4} from "../other/Vector4";
import {BaseBorders} from "../base/BaseBorders";
import {StringStream} from "../StringStream";

export type FrameBackdropTypes = FrameBaseArgs & {
    BackdropBackground?: BaseBackgrounds,
    BackdropCornerFlags?: Set<CornerFlags>,
    BackdropCornerSize?: number,
    BackdropBackgroundSize?: number,
    BackdropBackgroundInsets?: Vector4,
    BackdropEdgeFile?: BaseBorders,

    BackdropTileBackground?: boolean,
    BackdropBlendAll?: boolean,
};

export class FrameBackdrop extends FrameBase {
    public BackdropBackground?: BaseBackgrounds;
    public BackdropCornerFlags: Set<CornerFlags> = new Set();
    public BackdropCornerSize?: number;
    public BackdropBackgroundSize?: number;
    public BackdropBackgroundInsets?: Vector4;
    public BackdropEdgeFile?: BaseBorders;

    //Flags
    public BackdropTileBackground: boolean = false;
    public BackdropBlendAll: boolean = false;

    public constructor(name: string, args?: FrameBackdropTypes) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "BACKDROP");
        str.pushIndent();
        this.writeCommonData(str);

        if (this.BackdropTileBackground) str.writeIndentation().writeString(`BackdropTileBackground,\n`);
        if (this.BackdropBlendAll) str.writeIndentation().writeString(`BackdropBlendAll,\n`);
        this.writeCornerFlags(str);
        if (this.BackdropBackground) str.writeIndentation().writeString(`BackdropBackground ${this.BackdropBackground},\n`);

        if (this.BackdropCornerSize) str.writeIndentation().writeString(`BackdropCornerSize ${this.BackdropCornerSize},\n`);
        if (this.BackdropBackgroundSize) str.writeIndentation().writeString(`BackdropBackgroundSize ${this.BackdropBackgroundSize},\n`);
        if (this.BackdropBackgroundInsets) str.writeIndentation().writeString(`BackdropBackgroundInsets ${this.BackdropBackgroundInsets.toString()},\n`);
        if (this.BackdropEdgeFile) str.writeIndentation().writeString(`BackdropEdgeFile ${this.BackdropEdgeFile},\n`);

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString("}\n");
    }
    private writeCornerFlags(str: StringStream) {
        if (this.BackdropCornerFlags.size > 0) {
            str.writeIndentation().writeString("BackdropCornerFlags ");
            let first = true;
            for (let entry of this.BackdropCornerFlags) {
                if (!first) str.writeString("|")
                str.writeString(entry)
                first = false;
            }
            str.writeString(",\n");
        }
    }
}