import {IWriteAble} from "../IWriteAble";
import {StringStream} from "../StringStream";
import {SetPoint} from "./subtypes/SetPoint";
import {FrameType} from "./FrameTypes";
import {FontJustify} from "./subtypes/FontJustify";
import {Vector2} from "../other/Vector2";
import {RGBColor} from "../other/RGBColor";
import {FrameFont} from "./subtypes/FrameFont";
import {Vector4} from "../other/Vector4";
import {Anchor} from "./subtypes/Anchor";

export type FrameBaseArgs = {
    Width?: number,
    Height?: number,
    InheritsFrom?: FrameBase | string,
    InheritsWithChildren?: boolean,

    SetAllPoints?: boolean,
    DecorateFileNames?: boolean,
    UseActiveContext?: boolean,
    TabFocusPush?: boolean,

    Children?: FrameBase[],
    Points?: SetPoint[],
    Anchors?: Anchor[],

    Text?: string,
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

    //Special flags.
    HideOnLoad?: boolean,
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
    public UseActiveContext: boolean = false; //Not entirely sure.

    //Tab focus
    public TabFocusPush: boolean = false; //Used to set the tab button focus on this and its children glue buttons?
    public TabFocusDefault: boolean = false; //This is the default Tab focus button.
    public TabFocusNext?: string; //The next glue button to tab to when hitting Tab

    //Special
    public Children: FrameBase[] = []; //Children of this frame.
    public Points: SetPoint[] = []; //Used to align what this frame "sticks" to.
    public Anchors: Anchor[] = []; //Used to align what this frame "sticks" to direct parent. Mostly used for Texture/FrameString.

    //Text stuff
    public Text?: string;
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

    //Special flags
    public HideOnLoad: boolean = false;

    public addChild(frame: FrameBase) {
        this.Children.push(frame);
    }
    public printChildren(str: StringStream) {
        for (let child of this.Children) {
            child.compileToStringStream(str);
        }
    }

    public constructor(name: string, args?: FrameBaseArgs) {
        this.Name = name;
        this.mergeArgs(args);
    }
    public mergeArgs(args?: FrameBaseArgs) {
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
        if (this.UseActiveContext) str.writeIndentation().writeLine(`UseActiveContext,`);
        this.writeTabFocus(str);
        this.writeGeneric(str, this.Width, "Width");
        this.writeGeneric(str, this.Height, "Height");
        this.writeGeneric(str, this.Text, "Text");

        for (let point of this.Points) {
            point.compileToStringStream(str);
        }
        for (let ang of this.Anchors) {
            ang.compileToStringStream(str);
        }

        this.writeFontData(str);
    }
    private writeTabFocus(str: StringStream) {
        if (this.TabFocusPush) str.writeIndentation().writeLine(`TabFocusPush,`);
        if (this.TabFocusDefault) str.writeIndentation().writeLine(`TabFocusDefault,`);
        this.writeGeneric(str, this.TabFocusNext, "TabFocusNext");
    }
    public writeFontData(str: StringStream) {
        this.writeColor(str, this.FontColor, "FontColor");
        this.writeColor(str, this.FontHighlightColor, "FontHighlightColor");
        this.writeColor(str, this.FontDisabledColor, "FontDisabledColor");
        this.writeColor(str, this.FontShadowColor, "FontShadowColor");
        this.writeVector(str, this.FontShadowOffset, "FontShadowOffset");
        if (this.FrameFont) this.FrameFont.compileToStringStream(str);
        this.writeVector(str, this.FontJustificationOffset, "FontJustificationOffset");
        this.writeGeneric(str, this.FontJustificationH, "FontJustificationH", true);
        this.writeGeneric(str, this.FontJustificationV, "FontJustificationV", true);
        this.writeGeneric(str, this.FontFlags, "FontFlags");
    }

    public writeFrame(str: StringStream, frame: FrameType | undefined, header: string) {
        if (frame != null) {
            str.writeIndentation();
            str.writeLine(`${header} "${typeof frame == "string" ? frame : frame.Name}",`);
        }
    }
    public writeGeneric(str: StringStream, frame: string | number | undefined, header: string, noDoots: boolean = false) {
        if (frame != null) {
            str.writeIndentation();
            if (!noDoots && typeof frame == "string") {
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
    public writeColor(str: StringStream, color: RGBColor | undefined, header: string) {
        if (color != undefined) {
            str.writeIndentation()
                .writeLine(`${header} ${color.toString()},`);
        }
    }
    public writeVector(str: StringStream, vec: Vector2 | Vector4 | undefined, header: string) {
        if (vec != undefined) {
            str.writeIndentation()
                .writeLine(`${header} ${vec.toString()},`);
        }
    }
    public writeAnchor(str: StringStream, ang: Anchor | undefined, header: string) {
        if (ang != undefined) {
            str.writeIndentation()
                .writeLine(`${header} ${ang.toString()},`);
        }
    }

    public writeInheritsFrom(str: StringStream) {
        if (this.InheritsFrom != null) {
            str.writeString(` INHERITS`);
            if (this.InheritsWithChildren) str.writeString(` WITHCHILDREN`);
            str.writeString(` "${typeof this.InheritsFrom == "string" ? this.InheritsFrom : this.InheritsFrom.Name}"`);
        }
    }
    public abstract compileToStringStream(str: StringStream): void;
    public isSimple(): boolean {
        return false;
    }

    public compileToClass(depth: number) {
        let theClass = new StringStream();
        let theImports = new StringStream();
        let theFields = new StringStream();
        let theChildren = new StringStream();

        if (depth == 0) theClass.writeString("export ");
        theClass.writeLine(`class ${this.Name}{`)
        theClass.pushIndent();
        theFields.pushIndent();

        theClass.writeIndentation().writeLine(`public frameHandle: framehandle;`);
        theClass.writeIndentation().writeLine(`public parent: framehandle;`);
        theClass.writeIndentation().writeLine(`public frameContext: number;`);
        theClass.writeLine("");

        theClass.writeIndentation().writeLine(`public constructor(context: number, parent: framehandle = BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0)) {`); //Start constructor.
        theClass.pushIndent();
        theClass.writeIndentation().writeLine(`this.frameContext = context;`);
        theClass.writeIndentation().writeLine(`this.parent = parent;`)

        if (depth == 0) {
            if (this.isSimple()) {
                theClass.writeIndentation()
                    .writeLine(`this.frameHandle = BlzCreateSimpleFrame("${this.Name}", this.parent, this.frameContext);`);
            } else {
                theClass.writeIndentation()
                    .writeLine(`this.frameHandle = BlzCreateFrame("${this.Name}", this.parent, 0, this.frameContext);`);
            }
        } else {
            theClass.writeIndentation()
                .writeLine(`this.frameHandle = BlzGetFrameByName("${this.Name}",this.frameContext);`);
        }
        if (this.HideOnLoad) {
            theClass.writeIndentation()
                .writeLine(`BlzFrameSetVisible(this.frameHandle, false);`);
        }

        for (let i = 0; i < this.Children.length; i++) {
            let child = this.Children[i];
            if (child.Name.length > 0) {
                //Write constructor
                theClass.writeIndentation()
                    .writeString(`this.${child.Name} = new ${child.Name}(this.frameContext, this.frameHandle);`);

                //Write fields
                theFields.writeIndentation()
                    .writeLine(`public ${child.Name}: ${child.Name};`);

                theChildren.writeString(child.compileToClass(depth + 1));

                //theImports.writeLine(`import {${child.Name}} from "./${child.Name}";`)
            }
            theClass.writeLine(`//Child ${i} ${child.constructor.name}`);
        }

        theClass.writeLine(this.createClassConstructor().data)

        theClass.popIndent().writeIndentation().writeLine(`}`); //End Constructor.

        theClass.writeLine(theFields.data);

        theClass.writeLine(this.createClassApi().data);

        theClass.popIndent();
        theClass.writeLine(`}`);

        return theImports.data + "\n\n" + theClass.data + theChildren.data;
    }

    public createClassApi() {
        let theClass = new StringStream();
        theClass.pushIndent();
        this.compileStandardApi(theClass);

        theClass.popIndent();
        return theClass;
    }

    protected createClassConstructor() {
        let theClass = new StringStream();
        theClass.pushIndent();
        this.compileStandardClassConstructor(theClass);

        theClass.popIndent();
        return theClass;
    }

    protected compileStandardClassConstructor(theClass: StringStream) {
        theClass.writeIndentation().writeLine("//Custom constructor");
    }

    protected compileStandardApi(theClass: StringStream) {
        //Text
        theClass.writeIndentation().writeLine(`public setText(text: string) {`);
        theClass.pushIndent().writeIndentation().writeLine(`BlzFrameSetText(this.frameHandle, text);`)
            .writeIndentation().writeLine(`return this;`).popIndent();
        theClass.writeIndentation().writeLine(`}`);
        theClass.writeIndentation().writeLine(`public addText(text: string) {`);
        theClass.pushIndent().writeIndentation().writeLine(`BlzFrameAddText(this.frameHandle, text);`)
            .writeIndentation().writeLine(`return this;`).popIndent();
        theClass.writeIndentation().writeLine(`}`);
        theClass.writeIndentation().writeLine(`public getText() {`);
        theClass.pushIndent().writeIndentation().writeLine(`return BlzFrameGetText(this.frameHandle);`).popIndent();
        theClass.writeIndentation().writeLine(`}`);
        //Points
        theClass.writeIndentation().writeLine(`public setPoint(childPoint: framepointtype, relative: framehandle, parentPoint: framepointtype, x: number, y: number) {`);
        theClass.pushIndent().writeIndentation().writeLine(`BlzFrameSetPoint(this.frameHandle, childPoint, relative, parentPoint, x, y);`)
            .writeIndentation().writeLine(`return this;`).popIndent();
        theClass.writeIndentation().writeLine(`}`);
        theClass.writeIndentation().writeLine(`public setPointAbsolute(childPoint: framepointtype, x: number, y: number) {`);
        theClass.pushIndent().writeIndentation().writeLine(`BlzFrameSetAbsPoint(this.frameHandle, childPoint, x, y);`)
            .writeIndentation().writeLine(`return this;`).popIndent();
        theClass.writeIndentation().writeLine(`}`);

    }
}