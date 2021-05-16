import {IWriteAble} from "../IWriteAble";
import {StringStream} from "../StringStream";
import {SetPoint} from "./subtypes/SetPoint";
import {FrameType} from "./FrameTypes";
import {FontJustify} from "./subtypes/FontJustify";
import {Vector2} from "../other/Vector2";
import {RGBColor} from "../other/RGBColor";
import {FrameFont} from "./subtypes/FrameFont";

export type FrameBaseArgs = {
    Width?: number,
    Height?: number,
    InheritsFrom?: FrameBase | string,
    InheritsWithChildren?: boolean,

    SetAllPoints?: boolean,
    DecorateFileNames?: boolean,

    Children?: FrameBase[],
    Points?: SetPoint[],

    FrameFont?: FrameFont,
    FontJustificationH?: FontJustify,
    FontJustificationV?: FontJustify,
    FontJustificationOffset?: Vector2,
    FontFlags?: (string | 'FIXEDSIZE'),
    FontColor?: RGBColor,
    FontHighlightColor?: RGBColor,
    FontDisabledColor?: RGBColor,
    FontShadowColor?: RGBColor,
    FontShadowOffset?: Vector2,
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

    public FrameFont?: FrameFont;
    public FontJustificationH?: FontJustify; //How the text should expand/align.
    public FontJustificationV?: FontJustify; //Is this even real?
    public FontJustificationOffset?: Vector2;
    public FontFlags?: (string | 'FIXEDSIZE');
    public FontColor?: RGBColor; //RGBA
    public FontHighlightColor?: RGBColor; //RGBA
    public FontDisabledColor?: RGBColor; //RGBA
    public FontShadowColor?: RGBColor; //RGBA
    public FontShadowOffset?: Vector2;

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
        this.writeGeneric(str, this.Width, "Width");
        this.writeGeneric(str, this.Height, "Height");

        for (let point of this.Points) {
            point.writeToString(str);
        }

        this.writeFontData(str);
    }
    private writeFontData(str: StringStream) {
        if (this.FontColor) str.writeIndentation().writeString(`FontColor ${this.FontColor.toString()},\n`);
        if (this.FontHighlightColor) str.writeIndentation().writeString(`FontHighlightColor ${this.FontHighlightColor.toString()},\n`);
        if (this.FontDisabledColor) str.writeIndentation().writeString(`FontDisabledColor ${this.FontDisabledColor.toString()},\n`);
        if (this.FontShadowColor) str.writeIndentation().writeString(`FontShadowColor ${this.FontShadowColor.toString()},\n`);
        if (this.FontShadowOffset) str.writeIndentation().writeString(`FontShadowOffset ${this.FontShadowOffset.toString()},\n`);
        if (this.FrameFont) this.FrameFont.writeToString(str);
        if (this.FontJustificationOffset) str.writeIndentation().writeString(`FontJustificationOffset ${this.FontJustificationOffset.toString()},\n`);

        this.writeGeneric(str, this.FontJustificationH, "FontJustificationH");
        this.writeGeneric(str, this.FontJustificationV, "FontJustificationV");
        this.writeGeneric(str, this.FontFlags, "FontFlags");
    }

    public writeFrame(str: StringStream, frame: FrameType | undefined, header: string) {
        if (frame != null) {
            str.writeIndentation();
            str.writeLine(`${header} "${typeof frame == "string" ? frame : frame.Name}",`);
        }
    }
    public writeGeneric(str: StringStream, frame: string | number | undefined, header: string) {
        if (frame != null) {
            str.writeIndentation();
            if (typeof frame == "string") {
                str.writeLine(`${header} "${frame}",`);
            } else {
                str.writeLine(`${header} ${frame},`);
            }
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

