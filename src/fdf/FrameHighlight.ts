import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";


export type FrameHighlightArgs = FrameBaseArgs & {
    HighlightType?: string | 'FILETEXTURE',
    HighlightAlphaFile?: string,
    HighlightAlphaMode?: string | 'ADD',
};

export class FrameHighlight extends FrameBase {
    public HighlightType?: string; //"FILETEXTURE"
    public HighlightAlphaFile?: string; //EscMenuButtonMouseOverHighlight
    public HighlightAlphaMode?: string; //ADD

    public constructor(name: string, args?: FrameHighlightArgs) {
        super(name);
        this.mergeArgs(args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "HIGHLIGHT");
        str.pushIndent();

        this.writeCommonData(str);

        this.writeGeneric(str, this.HighlightType, "HighlightType");
        this.writeGeneric(str, this.HighlightAlphaFile, "HighlightAlphaFile");
        this.writeGeneric(str, this.HighlightAlphaMode, "HighlightAlphaMode");

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}