import {IWriteAble} from "../IWriteAble";
import {StringStream} from "../StringStream";
import {FrameBase} from "./FrameBase";
import {BaseFrames} from "../base/BaseFrames";

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
    public xOffset: number;
    public yOffset: number;

    constructor(myPoint: PointAlign, parentFrame: FrameBase | BaseFrames, parentPoint: PointAlign, xOffset: number, yOffset: number) {
        this.myPoint = myPoint;
        this.parentFrame = parentFrame;
        this.parentPoint = parentPoint;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
    }
    writeToString(str: StringStream): void {
        str.writeIndentation()
            .writeString(`SetPoint ${this.myPoint}, `);

        str.writeString(`"${typeof this.parentFrame == "string" ? this.parentFrame : this.parentFrame.name}", `);
        str.writeString(`${this.parentPoint}, ${this.xOffset}, ${this.yOffset}, \n`);
    }

}