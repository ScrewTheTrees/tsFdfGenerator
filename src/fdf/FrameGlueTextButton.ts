import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";


export type FrameGlueTextButtonArgs = FrameBaseArgs & {
    buttonText?: string,
};

export class FrameGlueTextButton extends FrameBase {
    public buttonText: string = "";

    public constructor(name: string, args?: FrameGlueTextButtonArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "GLUETEXTBUTTON");
        str.pushIndent();

        this.writeCommonData(str);
        str.writeIndentation().writeString(`ButtonText "${this.buttonText}",\n`)

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}