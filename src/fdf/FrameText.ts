import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {SetPoint} from "./SetPoint";
import {FontJustify} from "./FontJustify";


export type FrameDialogArgs = FrameBaseArgs & {
    points?: SetPoint[],
    fontJustificationH?: FontJustify,
    fontJustificationV?: FontJustify,
    text?: string,
};
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

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}