import {IWriteAble} from "../../IWriteAble";
import {StringStream} from "../../StringStream";
import {PAlign} from "./PAlign";

export class Anchor implements IWriteAble {
    public myPoint: PAlign;
    public xAlign: number; //These alignments work very wonky at times. Weird stuff really.
    public yAlign: number;

    constructor(myPoint: PAlign, xx: number, yy: number) {
        this.myPoint = myPoint;
        this.xAlign = xx;
        this.yAlign = yy;
    }
    compileToStringStream(str: StringStream): void {
        str.writeIndentation()
            .writeLine(`Anchor ${this.myPoint}, ${this.xAlign}, ${this.yAlign},`);
    }
}