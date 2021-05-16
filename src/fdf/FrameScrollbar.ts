import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {SetPoint} from "./SetPoint";


export type FrameGlueCheckboxArgs = FrameBaseArgs & {
    points?: SetPoint[],
};

export class FrameScrollBar extends FrameBase {
    public points: SetPoint[] = [];

    public constructor(name: string, args?: FrameGlueCheckboxArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "SCROLLBAR");
        str.pushIndent();

        this.writeCommonData(str);
        for (let point of this.points) {
            point.writeToString(str);
        }

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}