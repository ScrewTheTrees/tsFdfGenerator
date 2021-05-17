
import {StringStream} from "../StringStream";
import {FrameBase} from "./FrameBase";


export type RootArgs = {
    Children?: FrameBase[],
    IncludeFiles?: string[]
};

export class Root{
    public Children: FrameBase[] = [];
    public IncludeFiles: string[] = [];

    constructor(args?: RootArgs) {
        if (args) Object.assign(this, args);
    }

    public addChild(frame: FrameBase) {
        this.Children.push(frame);
    }

    compileFile(): StringStream {
        const str: StringStream = new StringStream();
        if (this.IncludeFiles.length > 0) {
            str.writeString("//--Includes--\n");
            for (let file of this.IncludeFiles) {
                str.writeString(`IncludeFile "${file}",\n`);
            }
            str.writeString("\n");
        }
        if (this.Children.length > 0) {
            str.writeString("//--Frames--\n");
            for (let child of this.Children) {
                child.compileToStringStream(str);
            }
        }
        str.writeString("\n");
        return str;
    }
}