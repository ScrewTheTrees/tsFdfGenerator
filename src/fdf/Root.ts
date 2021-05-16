import {IWriteAble} from "../IWriteAble";
import {StringStream} from "../StringStream";
import {FrameBase} from "./FrameBase";


export type RootArgs = {
    children?: FrameBase[],
    includeFiles?: string[]
};

export class Root implements IWriteAble {
    public children: FrameBase[] = [];
    public includeFiles: string[] = [];

    constructor(args?: RootArgs) {
        if (args) Object.assign(this, args);
    }

    public addChild(frame: FrameBase) {
        this.children.push(frame);
    }

    writeToString(str: StringStream): void {
        if (this.includeFiles.length > 0) {
            str.writeString("//--Includes--\n");
            for (let file of this.includeFiles) {
                str.writeString(`IncludeFile "${file}",\n`);
            }
            str.writeString("\n");
        }
        if (this.children.length > 0) {
            str.writeString("//--Frames--\n");
            for (let child of this.children) {
                child.writeToString(str);
            }
        }
        str.writeString("\n");
    }
}