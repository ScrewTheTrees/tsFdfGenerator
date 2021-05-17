import {IWriteAble} from "../../IWriteAble";
import {StringStream} from "../../StringStream";
import {PAlign} from "./PAlign";

export class Anchor implements IWriteAble {
    public myPoint: PAlign;
    public xx: number;
    public yy: number;

    constructor(myPoint: PAlign, xx: number, yy: number) {
        this.myPoint = myPoint;
        this.xx = xx;
        this.yy = yy;
    }
    compileToStringStream(str: StringStream): void {
        str.writeIndentation()
            .writeLine(`Anchor ${this.myPoint}, ${this.xx}, ${this.yy},`);
    }
}