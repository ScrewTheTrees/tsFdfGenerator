import {StringStream} from "../../StringStream";
import {FrameSimpleFrame, FrameSimpleFrameArgs} from "../FrameSimpleFrame";

/**
 * This frame is made to stretch across entire game window.
 * Use the updateFrameCorners to adjust.
 */
export class FullScreenSimpleFrame extends FrameSimpleFrame {
    public constructor(name: string, args?: FrameSimpleFrameArgs) {
        super(name);
        this.mergeArgs({
            Width: 0.8,
            Height: 0.6,
            ...args
        });
    }

    public isSimple(): boolean {
        return true;
    }


    protected compileStandardClassConstructor(theClass: StringStream) {
        theClass.pushIndent();
        theClass.writeLine("");
        theClass.writeIndentation().writeLine("BlzFrameClearAllPoints(this.frameHandle);");
        theClass.writeIndentation().writeLine("BlzFrameSetAbsPoint(this.frameHandle, FRAMEPOINT_BOTTOM, 0.4, 0);");
        theClass.writeIndentation().writeLine("this.updateFrame();");
        theClass.popIndent();
    }

    public createClassApi() {
        let theClass = new StringStream();
        theClass.pushIndent();
        this.compileStandardApi(theClass);

        theClass.writeIndentation().writeLine(`public updateFrame() {`);
        theClass.pushIndent().writeIndentation()
            .writeLine(`BlzFrameSetSize(this.frameHandle, this.getWidescreenFrameMultiplicationValue(), 0.6);`)
            .writeIndentation().writeLine(`return this;`).popIndent();
        theClass.writeIndentation().writeLine(`}`);

        theClass.writeIndentation().writeLine(`public getWidescreenFrameMultiplicationValue() {`);
        theClass.pushIndent().writeIndentation()
            .writeLine(`return 0.6 * ((BlzGetLocalClientWidth() || 640) / (BlzGetLocalClientHeight() || 480));`)
            .popIndent();
        theClass.writeIndentation().writeLine(`}`);

        theClass.popIndent();
        return theClass;
    }
}