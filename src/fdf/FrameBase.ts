import {IWriteAble} from "../IWriteAble";
import {StringStream} from "../StringStream";

export type FrameBaseArgs = {
    width?: number,
    height?: number,
    inheritsFrom?: FrameBase | string,
    decorateFileName?: boolean,

    children?: FrameBase[]
};

export abstract class FrameBase implements IWriteAble {
    public name;
    public width?: number;
    public height?: number;
    public inheritsFrom?: FrameBase | string;

    //Flags
    public decorateFileName: boolean = false;

    public children: FrameBase[] = [];
    public addChild(frame: FrameBase) {
        this.children.push(frame);
    }

    public constructor(name: string, args: FrameBaseArgs | undefined) {
        this.name = name;
        if (args) Object.assign(this, args);
    }
    public writeBaseHeader(str: StringStream, type: string) {
        str.writeIndentation();
        str.writeString(`Frame "${type}" "${this.name}"`);
        this.writeInheritsFrom(str);
        str.writeString(` {\n`);
    }
    public writeCommonData(str: StringStream) {
        if (this.decorateFileName != null) str.writeIndentation().writeString(`DecorateFileNames,\n`);
        if (this.width != null) str.writeIndentation().writeString(`Width ${this.width},\n`);
        if (this.height != null) str.writeIndentation().writeString(`Height ${this.height},\n`);
    }
    private writeInheritsFrom(str: StringStream) {
        if (this.inheritsFrom != null) {
            str.writeString(` INHERITS `)
            if (typeof this.inheritsFrom == "string") {
                str.writeString(this.inheritsFrom);
            } else {
                str.writeString(this.inheritsFrom.name);
            }
        }
    }
    public abstract writeToString(str: StringStream): void;
}