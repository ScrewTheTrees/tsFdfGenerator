import {IWriteAble} from "../../IWriteAble";
import {StringStream} from "../../StringStream";
import {PAlign} from "./PAlign";
import {FrameType} from "../FrameTypes";

export class SetPoint implements IWriteAble {
    public myPoint: PAlign;
    public parentFrame: FrameType;
    public parentPoint: PAlign;
    public xAlign: number;
    public yAlign: number;

    constructor(myPoint: PAlign, parentFrame: FrameType, parentPoint: PAlign, xx: number = 0, yy: number = 0) {
        this.myPoint = myPoint;
        this.parentFrame = parentFrame;
        this.parentPoint = parentPoint;
        this.xAlign = xx;
        this.yAlign = yy;
    }
    compileToStringStream(str: StringStream): void {
        str.writeIndentation()
            .writeString(`SetPoint ${this.myPoint}, `);

        str.writeString(`"${typeof this.parentFrame == "string" ? this.parentFrame : this.parentFrame.Name}", `);
        str.writeString(`${this.parentPoint}, ${this.xAlign}, ${this.yAlign}, \n`);
    }

    public static Anchor(point: PAlign, parentFrame: FrameType, xAlign: number = 0, yAlign: number = 0) {
        return new SetPoint(point, parentFrame, point, xAlign, yAlign);
    }

}