import {StringStream} from "../StringStream";
import {FrameControlBase, FrameControlBaseArgs} from "./FrameControlBase";
import {FrameButtonType} from "./FrameTypes";


export type FrameSliderArgs = FrameControlBaseArgs & {
    SliderLayoutHorizontal?: boolean,
    SliderLayoutVertical?: boolean,
    SliderThumbButtonFrame?: FrameButtonType,
};

export class FrameSlider extends FrameControlBase {
    public SliderLayoutHorizontal: boolean = false;   //Usually used for sliders
    public SliderLayoutVertical: boolean = false;     //Usually used for scrollbars.
    public SliderThumbButtonFrame?: FrameButtonType;  //The button you click and drag.

    public constructor(name: string, args?: FrameSliderArgs) {
        super(name);
        Object.assign(this, args);
    }

    writeToString(str: StringStream): void {
        this.writeBaseHeader(str, "SLIDER");
        str.pushIndent();
        this.writeCommonData(str);
        this.writeSlider(str);
        this.writeControl(str);

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeLine(`}`)
    }
    public writeSlider(str: StringStream) {
        if (this.SliderLayoutHorizontal) str.writeIndentation().writeLine(`SliderLayoutHorizontal,`)
        if (this.SliderLayoutVertical) str.writeIndentation().writeLine(`SliderLayoutVertical,`)
        this.writeFrame(str, this.SliderThumbButtonFrame, "SliderThumbButtonFrame");
    }
}

