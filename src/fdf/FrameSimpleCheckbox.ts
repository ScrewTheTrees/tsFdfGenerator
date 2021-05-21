import {StringStream} from "../StringStream";
import {FrameHighlightType} from "./FrameTypes";
import {FrameControlBase, FrameControlBaseArgs} from "./FrameControlBase";
import {BaseBackgrounds} from "../base/BaseBackgrounds";


export type FrameSimpleCheckboxArgs = FrameControlBaseArgs & {
    NormalTexture?: string,
    PushedTexture?: string,
    CheckedTexture?: string,
};

export class FrameSimpleCheckbox extends FrameControlBase {
    public NormalTexture?: string;  //Texture when just, empty, idle
    public PushedTexture?: string;  //Texture when mouse is pressed/held on the box.
    public CheckedTexture?: string; //Texture when its checked but idle.

    public constructor(name: string, args?: FrameSimpleCheckboxArgs) {
        super(name);
        Object.assign(this, args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "SIMPLECHECKBOX");
        str.pushIndent();
        this.writeCommonData(str);
        this.writeControl(str);

        this.writeGeneric(str, this.NormalTexture, "NormalTexture");
        this.writeGeneric(str, this.PushedTexture, "PushedTexture");
        this.writeGeneric(str, this.CheckedTexture, "CheckedTexture");

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}