import {IWriteAble} from "../IWriteAble";
import {StringStream} from "../StringStream";
import {FrameBase} from "./FrameBase";


export type RootArgs = { children?: FrameBase[] };

export class Root implements IWriteAble {
    public children: FrameBase[] = [];

    constructor(args?: RootArgs) {
        if (args) Object.assign(this, args);
    }

    public addChild(frame: FrameBase) {
        this.children.push(frame);
    }

    writeToString(str: StringStream): void {
        for (let child of this.children) {
            child.writeToString(str);
        }
        str.writeString("\n");
    }
}