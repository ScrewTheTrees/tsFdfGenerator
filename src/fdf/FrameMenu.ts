import {StringStream} from "../StringStream";
import {FrameControlBase, FrameControlBaseArgs} from "./FrameControlBase";
import {RGBColor} from "../other/RGBColor";

export type FrameMenuArgs = FrameControlBaseArgs & {
    MenuTextHighlightColor?: RGBColor,
    MenuItemHeight?: number,
    MenuBorder?: number,
};

export class FrameMenu extends FrameControlBase {
    public MenuTextHighlightColor?: RGBColor;
    public MenuItemHeight?: number;
    public MenuBorder?: number;

    public constructor(name: string, args?: FrameMenuArgs) {
        super(name);
        Object.assign(this, args);
    }

    compileToStringStream(str: StringStream): void {
        this.writeBaseHeader(str, "MENU");
        str.pushIndent();
        this.writeCommonData(str);
        this.writeControl(str);

        this.writeColor(str, this.MenuTextHighlightColor, "MenuTextHighlightColor");
        this.writeGeneric(str, this.MenuItemHeight, "MenuItemHeight");
        this.writeGeneric(str, this.MenuBorder, "MenuBorder");

        this.printChildren(str);

        str.popIndent();
        str.writeIndentation().writeString(`}\n`)
    }
}