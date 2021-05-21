import {StringStream} from "../StringStream";
import {FrameControlBase, FrameControlBaseArgs} from "./FrameControlBase";
import {FrameButtonType} from "./FrameTypes";


export type FrameSliderArgs = FrameControlBaseArgs & {
    SliderLayoutHorizontal?: boolean,
    SliderLayoutVertical?: boolean,
    SliderThumbButtonFrame?: FrameButtonType,

    SliderMinValue?: number,
    SliderMaxValue?: number,
    SliderInitialValue?: number,
    SliderStepSize?: number,
};

export class FrameSlider extends FrameControlBase {
    public SliderLayoutHorizontal: boolean = false;   //Usually used for sliders
    public SliderLayoutVertical: boolean = false;     //Usually used for scrollbars.
    public SliderThumbButtonFrame?: FrameButtonType;  //The button you click and drag.

    public SliderMinValue?: number;
    public SliderMaxValue?: number;
    public SliderInitialValue?: number;
    public SliderStepSize?: number;

    public constructor(name: string, args?: FrameSliderArgs) {
        super(name);
        Object.assign(this, args);
    }

    compileToStringStream(str: StringStream): void {
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
        this.writeGeneric(str, this.SliderMinValue, "SliderMinValue");
        this.writeGeneric(str, this.SliderMaxValue, "SliderMaxValue");
        this.writeGeneric(str, this.SliderInitialValue, "SliderInitialValue");
        this.writeGeneric(str, this.SliderStepSize, "SliderStepSize");
    }
}

