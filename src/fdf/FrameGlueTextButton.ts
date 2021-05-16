import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {SetPoint} from "./SetPoint";


export type FrameGlueTextArgs = FrameBaseArgs & {
    points?: SetPoint[],
    buttonText?: string,
};

export class FrameGlueTextButton extends FrameBase {
    public points: SetPoint[] = [];
    public buttonText: string = "";

    public constructor(name: string, args?: FrameGlueTextArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "GLUETEXTBUTTON");
        str.pushIndent();

        this.writeCommonData(str);
        for (let point of this.points) {
            point.writeToString(str);
        }

        str.writeIndentation().writeString(`ButtonText "${this.buttonText}",\n`)

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}