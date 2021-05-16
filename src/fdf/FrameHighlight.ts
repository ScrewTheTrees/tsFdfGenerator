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
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "HIGHLIGHT");
        str.pushIndent();

        this.writeCommonData(str);

        if (this.HighlightType) str.writeIndentation().writeString(`HighlightType "${this.HighlightType}",\n`);
        if (this.HighlightAlphaFile) str.writeIndentation().writeString(`HighlightAlphaFile "${this.HighlightAlphaFile}",\n`);
        if (this.HighlightAlphaMode) str.writeIndentation().writeString(`HighlightAlphaMode "${this.HighlightAlphaMode}",\n`);

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}