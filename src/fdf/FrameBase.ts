import {IWriteAble} from "../IWriteAble";
import {StringStream} from "../StringStream";
import {SetPoint} from "./SetPoint";

export type FrameBaseArgs = {
    width?: number,
    height?: number,
    inheritsFrom?: FrameBase | string,
    inheritsWithChildren?: boolean,
    decorateFileName?: boolean,

    children?: FrameBase[]
    points?: SetPoint[]

};

export abstract class FrameBase implements IWriteAble {
    public name;
    public width?: number;
    public height?: number;
    public inheritsFrom?: FrameBase | string;
    public inheritsWithChildren?: boolean = false;

    //Flags
    public decorateFileName: boolean = false;

    public points: SetPoint[] = [];
    public children: FrameBase[] = [];

    public addChild(frame: FrameBase) {
        this.children.push(frame);
    }
    public printChildren(str: StringStream) {
        for (let child of this.children) {
            child.writeToString(str);
        }
    }

    public constructor(name: string, args?: FrameBaseArgs) {
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
        if (this.decorateFileName) str.writeIndentation().writeString(`DecorateFileNames,\n`);
        if (this.width != null) str.writeIndentation().writeString(`Width ${this.width},\n`);
        if (this.height != null) str.writeIndentation().writeString(`Height ${this.height},\n`);
        for (let point of this.points) {
            point.writeToString(str);
        }
    }
    private writeInheritsFrom(str: StringStream) {
        if (this.inheritsFrom != null) {
            str.writeString(` INHERITS`);
            if (this.inheritsWithChildren) str.writeString(` WITHCHILDREN`);
            str.writeString(` "${typeof this.inheritsFrom == "string" ? this.inheritsFrom : this.inheritsFrom.name}"`);
        }
    }
    public abstract writeToString(str: StringStream): void;
}