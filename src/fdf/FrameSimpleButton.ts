import {StringStream} from "../StringStream";
import {Vector2} from "../other/Vector2";
import {FrameControlBase, FrameControlBaseArgs} from "./FrameControlBase";


export type FrameSimpleButtonArgs = FrameControlBaseArgs & {
};

export class FrameSimpleButton extends FrameControlBase {

    public constructor(name: string, args?: FrameSimpleButtonArgs) {
        super(name);
        Object.assign(this, args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "SIMPLEBUTTON");
        str.pushIndent();
        this.writeCommonData(str);
        this.writeControl(str);
        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeLine(`}`)
    }
}