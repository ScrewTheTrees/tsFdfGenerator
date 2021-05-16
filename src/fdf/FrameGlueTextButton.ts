import {StringStream} from "../StringStream";
import {Vector2} from "../other/Vector2";
import {FrameControlBase, FrameControlBaseArgs} from "./FrameControlBase";


export type FrameGlueTextButtonArgs = FrameControlBaseArgs & {
    ButtonText?: string,
    ButtonPushedTextOffset?: Vector2,
};

export class FrameGlueTextButton extends FrameControlBase {
    public ButtonText: string = "";
    public ButtonPushedTextOffset?: Vector2;

    public constructor(name: string, args?: FrameGlueTextButtonArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "GLUETEXTBUTTON");
        str.pushIndent();
        this.writeCommonData(str);
        this.writeControl(str);

        str.writeIndentation().writeLine(`ButtonText "${this.ButtonText}",`)
        if (this.ButtonPushedTextOffset)
            str.writeIndentation().writeLine(`ButtonPushedTextOffset ${this.ButtonPushedTextOffset.toString()},`);

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeLine(`}`)
    }
}