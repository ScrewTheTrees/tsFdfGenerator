import {StringStream} from "../StringStream";
import {FrameBase, FrameBaseArgs} from "./FrameBase";


export type FrameSimpleFrameArgs = FrameBaseArgs & {};

export class FrameSimpleFrame extends FrameBase {
    public constructor(name: string, args?: FrameSimpleFrameArgs) {
        super(name);
        Object.assign(this, args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "SIMPLEFRAME");
        str.pushIndent();
        this.writeCommonData(str);

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }

    public isSimple(): boolean {
        return true;
    }
}





