import {IWriteAble} from "../IWriteAble";
import {StringStream} from "../StringStream";
import {SetPoint} from "./subtypes/SetPoint";
import {FrameType} from "./FrameTypes";

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
    public InheritsFrom?: FrameType; //Makes this frame inherit from another frame.
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
        str.writeLine(` {`);
    }
    public writeCommonData(str: StringStream) {
        if (this.DecorateFileNames) str.writeIndentation().writeLine(`DecorateFileNames,`);
        if (this.SetAllPoints) str.writeIndentation().writeLine(`SetAllPoints,`);
        if (this.Width != null) str.writeIndentation().writeLine(`Width ${this.Width},`);
        if (this.Height != null) str.writeIndentation().writeLine(`Height ${this.Height},`);

        for (let point of this.Points) {
            point.writeToString(str);
        }
    }

    public writeFrame(str: StringStream, frame: FrameType | undefined, header: string) {
        if (frame != null) {
            str.writeIndentation();
            str.writeLine(`${header} "${typeof frame == "string" ? frame : frame.Name}",`);
        }
    }
    public writeSet<T extends string>(str: StringStream, set: Set<T>, header: string) {
        if (set.size > 0) {
            str.writeIndentation().writeString(`${header} "`);
            let first = true;
            for (let entry of set) {
                if (!first) str.writeString("|")
                str.writeString(entry.toString())
                first = false;
            }
            str.writeString(`",\n`);
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

