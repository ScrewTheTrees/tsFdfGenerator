import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {BaseBackgrounds} from "../base/BaseBackgrounds";
import {CornerFlags} from "../base/CornerFlags";
import {Vector4} from "../other/Vector4";
import {BaseBorders} from "../base/BaseBorders";
import {StringStream} from "../StringStream";

export type FrameBackdropTypes = FrameBaseArgs & {
    backdropBackground?: BaseBackgrounds,
    backdropCornerFlags?: Set<CornerFlags>,
    backdropCornerSize?: number,
    backdropBackgroundSize?: number,
    backdropBackgroundInsets?: Vector4,
    backdropEdgeFile?: BaseBorders,

    backdropTileBackground?: boolean,
    backdropBlendAll?: boolean,
};

export class FrameBackdrop extends FrameBase {
    public backdropBackground?: BaseBackgrounds;
    public backdropCornerFlags: Set<CornerFlags> = new Set();
    public backdropCornerSize?: number;
    public backdropBackgroundSize?: number;
    public backdropBackgroundInsets?: Vector4;
    public backdropEdgeFile?: BaseBorders;

    //Flags
    public backdropTileBackground: boolean = false;
    public backdropBlendAll: boolean = false;

    public constructor(name: string, args?: FrameBackdropTypes) {
        super(name, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "BACKDROP");
        str.pushIndent();
        this.writeCommonData(str);

        if (this.backdropTileBackground) str.writeIndentation().writeString(`BackdropTileBackground,\n`);
        if (this.backdropBlendAll) str.writeIndentation().writeString(`BackdropBlendAll,\n`);
        this.writeCornerFlags(str);
        if (this.backdropBackground) str.writeIndentation().writeString(`BackdropBackground ${this.backdropBackground},\n`);

        if (this.backdropCornerSize) str.writeIndentation().writeString(`BackdropCornerSize ${this.backdropCornerSize},\n`);
        if (this.backdropBackgroundSize) str.writeIndentation().writeString(`BackdropBackgroundSize ${this.backdropBackgroundSize},\n`);
        if (this.backdropBackgroundInsets) str.writeIndentation().writeString(`BackdropBackgroundSize ${this.backdropBackgroundInsets.toString()},\n`);
        if (this.backdropEdgeFile) str.writeIndentation().writeString(`BackdropEdgeFile ${this.backdropEdgeFile},\n`);


        str.popIndent();
        str.writeIndentation().writeString("}\n");
    }
    private writeCornerFlags(str: StringStream) {
        if (this.backdropCornerFlags.size > 0) {
            str.writeIndentation().writeString("BackdropCornerFlags ");
            let first = true;
            for (let entry of this.backdropCornerFlags) {
                if (!first) str.writeString("|")
                str.writeString(entry)
                first = false;
            }
            str.writeIndentation().writeString(",\n");
        }
    }
}