import {StringStream} from "../StringStream";
import {FrameHighlightType} from "./FrameTypes";
import {FrameControlBase, FrameControlBaseArgs} from "./FrameControlBase";
import {BaseBackgrounds} from "../base/BaseBackgrounds";


export type FrameSimpleStatusBarArgs = FrameControlBaseArgs & {
    BarTexture?: string,
};

/**
 * It cant be this basic can it? How are you supposed to adjust the BarTexture length.
 * Unless there is some native i am missing.
 */
export class FrameSimpleStatusBar extends FrameControlBase {
    public BarTexture?: string;

    public constructor(name: string, args?: FrameSimpleStatusBarArgs) {
        super(name);
        Object.assign(this, args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "SIMPLESTATUSBAR");
        str.pushIndent();
        this.writeCommonData(str);
        this.writeControl(str);

        this.writeGeneric(str, this.BarTexture, "BarTexture");

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}