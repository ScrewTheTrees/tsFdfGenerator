import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {SetPoint} from "./SetPoint";


export type FrameDialogArgs = FrameBaseArgs & {
    points?: SetPoint[],
    fontJustificationH?: FontJustify,
    fontJustificationV?: FontJustify,
    text?: string,
};

export const enum FontJustify {
    JUSTIFYLEFT = "JUSTIFYLEFT",
    JUSTIFYCENTER = "JUSTIFYCENTER",
    JUSTIFYRIGHT = "JUSTIFYRIGHT",
    JUSTIFYTOP = "JUSTIFYTOP",
    JUSTIFYBOTTOM = "JUSTIFYBOTTOM",
}

export class FrameText extends FrameBase {
    public points: SetPoint[] = [];
    public fontJustificationH?: FontJustify;
    public fontJustificationV?: FontJustify;
    public text: string = "";

    public constructor(name: string, args?: FrameDialogArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "TEXT");
        str.pushIndent();

        this.writeCommonData(str);
        for (let point of this.points) {
            point.writeToString(str);
        }

        if (this.fontJustificationH) str.writeIndentation().writeString(`FontJustificationH ${this.fontJustificationH},\n`)
        if (this.fontJustificationV) str.writeIndentation().writeString(`FontJustificationV ${this.fontJustificationV},\n`)
        str.writeIndentation().writeString(`Text "${this.text}",\n`)

        for (let child of this.children) {
            child.writeToString(str);
        }

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}