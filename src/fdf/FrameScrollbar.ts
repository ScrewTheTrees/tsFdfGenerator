import {StringStream} from "../StringStream";
import {FrameSlider} from "./FrameSlider";

export class FrameScrollbar extends FrameSlider {
    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "SCROLLBAR");
        str.pushIndent();
        this.writeCommonData(str);
        this.writeSlider(str);
        this.writeControl(str);

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeLine(`}`)
    }
}