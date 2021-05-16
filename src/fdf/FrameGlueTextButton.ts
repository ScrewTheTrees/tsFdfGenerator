import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";


export type FrameGlueTextButtonArgs = FrameBaseArgs & {
    ButtonText?: string,
};

export class FrameGlueTextButton extends FrameBase {
    public ButtonText: string = "";

    public constructor(name: string, args?: FrameGlueTextButtonArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "GLUETEXTBUTTON");
        str.pushIndent();

        this.writeCommonData(str);
        str.writeIndentation().writeString(`ButtonText "${this.ButtonText}",\n`)

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}