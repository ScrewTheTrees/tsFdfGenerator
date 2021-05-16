import {IWriteAble} from "../IWriteAble";
import {StringStream} from "../StringStream";
import {SetPoint} from "./SetPoint";

export type FrameBaseArgs = {
    width?: number,
    height?: number,
    inheritsFrom?: FrameBase | string,
    inheritsWithChildren?: boolean,
    decorateFileName?: boolean,

    children?: FrameBase[],
    points?: SetPoint[],
    setAllPoints?: boolean,
};

export abstract class FrameBase implements IWriteAble {
    public name; //All frames need a name, preferably it should be entirely unique.
    public width?: number;
    public height?: number;
    public inheritsFrom?: FrameBase | string; //Makes this frame inherit from another frame.
    public inheritsWithChildren?: boolean = false; //adds the "WITHCHILDREN" to inherit children too.

    //Flags
    public decorateFileName: boolean = false; //This causes it to fetch files based on an alias.
    public setAllPoints: boolean = false; //Sets all the points to its parent frame.

    public points: SetPoint[] = []; //Used to align what this frame "sticks" to.
    public children: FrameBase[] = []; //Children of this frame.

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
        if (this.setAllPoints) str.writeIndentation().writeString(`SetAllPoints,\n`);
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