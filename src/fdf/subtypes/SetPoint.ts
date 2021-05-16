import {IWriteAble} from "../../IWriteAble";
import {StringStream} from "../../StringStream";
import {FrameBase} from "../FrameBase";
import {BaseFrames} from "../../base/BaseFrames";

export const enum PointAlign {
    TOPLEFT = "TOPLEFT",
    TOPRIGHT = "TOPRIGHT",
    BOTTOMLEFT = "BOTTOMLEFT",
    BOTTOMRIGHT = "BOTTOMRIGHT",
    TOP = "TOP",
    BOTTOM = "BOTTOM",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
}

export class SetPoint implements IWriteAble {
    public myPoint: PointAlign;
    public parentFrame: FrameBase | BaseFrames;
    public parentPoint: PointAlign;
    public xx: number;
    public yy: number;

    constructor(myPoint: PointAlign, parentFrame: FrameBase | BaseFrames, parentPoint: PointAlign, xx: number, yy: number) {
        this.myPoint = myPoint;
        this.parentFrame = parentFrame;
        this.parentPoint = parentPoint;
        this.xx = xx;
        this.yy = yy;
    }
    writeToString(str: StringStream): void {
        str.writeIndentation()
            .writeString(`SetPoint ${this.myPoint}, `);

        str.writeString(`"${typeof this.parentFrame == "string" ? this.parentFrame : this.parentFrame.name}", `);
        str.writeString(`${this.parentPoint}, ${this.xx}, ${this.yy}, \n`);
    }

}