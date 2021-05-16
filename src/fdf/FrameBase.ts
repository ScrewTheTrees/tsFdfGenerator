import {IWriteAble} from "../IWriteAble";
import {StringStream} from "../StringStream";
import {SetPoint} from "./subtypes/SetPoint";
import {BaseFrames} from "../base/BaseFrames";

export type FrameBaseArgs = {
    Width?: number,
    Height?: number,
    InheritsFrom?: FrameBase | string,
    InheritsWithChildren?: boolean,

    SetAllPoints?: boolean,
    DecorateFileNames?: boolean,

    Children?: FrameBase[],
    Points?: SetPoint[],
};

export abstract class FrameBase implements IWriteAble {
    public Name; //All frames need a name, preferably it should be entirely unique.
    public Width?: number;
    public Height?: number;
    public InheritsFrom?: FrameBase | string; //Makes this frame inherit from another frame.
    public InheritsWithChildren?: boolean = false; //adds the "WITHCHILDREN" to inherit children too.

    //Flags
    public SetAllPoints: boolean = false; //Sets all the points to its parent frame.
    public DecorateFileNames: boolean = false; //Inside this Frame Filenames are lookups in a string table like GameInterface etc.

    public Children: FrameBase[] = []; //Children of this frame.
    public Points: SetPoint[] = []; //Used to align what this frame "sticks" to.

    public addChild(frame: FrameBase) {
        this.Children.push(frame);
    }
    public printChildren(str: StringStream) {
        for (let child of this.Children) {
            child.writeToString(str);
        }
    }

    public constructor(name: string, args?: FrameBaseArgs) {
        this.Name = name;
        if (args) Object.assign(this, args);
    }
    public writeBaseHeader(str: StringStream, type: string) {
        str.writeIndentation();
        str.writeString(`Frame "${type}" "${this.Name}"`);
        this.writeInheritsFrom(str);
        str.writeString(` {\n`);
    }
    public writeCommonData(str: StringStream) {
        if (this.DecorateFileNames) str.writeIndentation().writeString(`DecorateFileNames,\n`);
        if (this.SetAllPoints) str.writeIndentation().writeString(`SetAllPoints,\n`);
        if (this.Width != null) str.writeIndentation().writeString(`Width ${this.Width},\n`);
        if (this.Height != null) str.writeIndentation().writeString(`Height ${this.Height},\n`);

        for (let point of this.Points) {
            point.writeToString(str);
        }
    }

    public writeFrame(str: StringStream, frame: FrameBase | BaseFrames | undefined, header: string) {
        if (frame != null) {
            str.writeIndentation();
            str.writeString(`${header} "${typeof frame == "string" ? frame : frame.Name}",\n`);
        }
    }

    private writeInheritsFrom(str: StringStream) {
        if (this.InheritsFrom != null) {
            str.writeString(` INHERITS`);
            if (this.InheritsWithChildren) str.writeString(` WITHCHILDREN`);
            str.writeString(` "${typeof this.InheritsFrom == "string" ? this.InheritsFrom : this.InheritsFrom.Name}"`);
        }
    }
    public abstract writeToString(str: StringStream): void;
}