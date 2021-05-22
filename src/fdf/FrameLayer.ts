import {FrameBase, FrameBaseArgs} from "./FrameBase";
import {StringStream} from "../StringStream";

export type FrameLayerArgs = FrameBaseArgs & {
};

export type FrameLayerTypes = ('ARTWORK' | 'BACKGROUND');

export class FrameLayer extends FrameBase {
    public Type: FrameLayerTypes;
    public constructor(type: FrameLayerTypes, args?: FrameLayerArgs) {
        super("");
        this.Type = type;
        this.mergeArgs(args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeLayerHeader(str);
        str.pushIndent();
        this.writeCommonData(str);

        this.printChildren(str);
        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }

    public writeLayerHeader(str: StringStream) {
        str.writeIndentation();
        str.writeString(`Layer "${this.Type}"`);
        this.writeInheritsFrom(str);
        str.writeLine(` {`);
    }
}