import {FrameBackdrop} from "../src/fdf/FrameBackdrop";
import {BaseBackgrounds} from "../src/base/BaseBackgrounds";
import {CornerFlagsAll} from "../src/fdf/subtypes/CornerFlags";
import {Vector4} from "../src/other/Vector4";
import {BaseBorders} from "../src/base/BaseBorders";
import {FrameHighlight} from "../src/fdf/FrameHighlight";
import {FrameGlueTextButton} from "../src/fdf/FrameGlueTextButton";
import {ControlStylesAll} from "../src/fdf/subtypes/ControlStyles";
import {Vector2} from "../src/other/Vector2";
import {BaseFrames} from "../src/base/BaseFrames";
import {FrameText} from "../src/fdf/FrameText";
import {FrameFont} from "../src/fdf/subtypes/FrameFont";
import {BaseFonts} from "../src/base/BaseFonts";
import {FontJustify} from "../src/fdf/subtypes/FontJustify";
import {FrameSlider} from "../src/fdf/FrameSlider";
import {FrameScrollbar} from "../src/fdf/FrameScrollbar";
import {FrameMenu} from "../src/fdf/FrameMenu";
import {RGBAColor} from "../src/other/RGBAColor";
import {RGBColor} from "../src/other/RGBColor";
import {FrameButton} from "../src/fdf/FrameButton";
import {FramePopupMenu} from "../src/fdf/FramePopupMenu";
import {FrameGlueCheckbox} from "../src/fdf/FrameGlueCheckbox";
import {FrameEditBox} from "../src/fdf/FrameEditBox";
import {FrameTextArea} from "../src/fdf/FrameTextArea";
import {FrameSimpleFrame} from "../src/fdf/FrameSimpleFrame";
import {FrameTexture} from "../src/fdf/FrameTexture";
import {Anchor} from "../src/fdf/subtypes/Anchor";
import {PAlign} from "../src/fdf/subtypes/PAlign";
import {FrameString} from "../src/fdf/FrameString";
import {Font} from "../src/fdf/subtypes/Font";
import {FrameLayer} from "../src/fdf/FrameLayer";
import {FrameSimpleButton} from "../src/fdf/FrameSimpleButton";
import {FrameSimpleCheckbox} from "../src/fdf/FrameSimpleCheckbox";
import {FrameSimpleStatusBar} from "../src/fdf/FrameSimpleStatusBar";

export function testAll() {
    const backdrop = new FrameBackdrop("BackdropTest", {
        DecorateFileNames: true,
        BackdropTileBackground: true,
        BackdropBackground: BaseBackgrounds.EscMenuBackground,
        BackdropCornerFlags: CornerFlagsAll(),
        BackdropCornerSize: 0.0125,
        BackdropBackgroundSize: 0.256,
        BackdropBackgroundInsets: new Vector4(0.005, 0.005, 0.005, 0.005),
        BackdropEdgeFile: BaseBorders.EscMenuButtonBorder,
    });
    const highlight = new FrameHighlight("HighlightTest", {
        DecorateFileNames: true,
        HighlightType: "FILETEXTURE",
        HighlightAlphaFile: "EscMenuButtonMouseOverHighlight",
        HighlightAlphaMode: "ADD",
    });
    const glueTextButton = new FrameGlueTextButton("GlueTextButtonTest", {
        Width: 0.0228,
        Height: 0.035,
        ButtonText: "TestCum",
        ButtonPushedTextOffset: new Vector2(0.002, -0.002),
        ControlStyle: ControlStylesAll(),
        ControlBackdrop: backdrop,
        ControlPushedBackdrop: BaseFrames.AllianceBackdrop,
        ControlDisabledBackdrop: "ButtonDisabledBackdropTemplate",
        ControlDisabledPushedBackdrop: backdrop,
        ControlMouseOverHighlight: highlight,
    });
    const text = new FrameText("TextTest", {
        DecorateFileNames: true,
        FrameFont: new FrameFont(BaseFonts.EscMenuTextFont, 0.013, ""),
        FontJustificationH: FontJustify.JUSTIFYCENTER,
        FontJustificationV: FontJustify.JUSTIFYMIDDLE,
        FontJustificationOffset: new Vector2(0.0, -0.002),
        FontFlags: "FIXEDSIZE",
        FontColor: new RGBAColor(0.99, 0.827, 0.0705, 1),
        FontHighlightColor: new RGBAColor(1, 1, 1, 1),
        FontDisabledColor: new RGBAColor(0.5, 0.5, 0.5, 1),
        FontShadowColor: new RGBAColor(0, 0, 0, 1),
        FontShadowOffset: new Vector2(0.002, 0.002),
        Text: "TestCum2",
    });
    const frameSlider = new FrameSlider("TestSlider", {
        SliderLayoutHorizontal: true,
        SliderThumbButtonFrame: glueTextButton,
        ControlBackdrop: backdrop,
        ControlDisabledBackdrop: "EscMenuThumbButtonDisabledBackdrop",
    });
    const frameScrollbar = new FrameScrollbar("TestScrollbar", {
        SliderLayoutVertical: true,
        InheritsFrom: frameSlider,
        InheritsWithChildren: true,
    });
    const menu = new FrameMenu("TestMenu", {
        DecorateFileNames: true,
        Height: 0.03,
        FrameFont: new FrameFont(BaseFonts.EscMenuTextFont, 0.011, ""),
        MenuTextHighlightColor: new RGBColor(1.0, 0, 0),
        MenuItemHeight: 0.014,
        MenuBorder: 0.009,
    });
    const button = new FrameButton("TestButton", {
        ControlBackdrop: backdrop,
    });
    const popupMenu = new FramePopupMenu("TestPopupMenu", {
        Width: 0.111875,
        Height: 0.03,
        PopupButtonInset: 0.01,
        PopupMenuFrame: menu
    });
    const glueCheckBox = new FrameGlueCheckbox("TestGlueCheckbox", {
        Width: 0.024,
        CheckBoxCheckHighlight: "EscMenuCheckHighlightTemplate",
        CheckBoxDisabledCheckHighlight: highlight,
    });
    const editBox = new FrameEditBox("TestEditBox", {
        Width: 0.024,
        EditBorderSize: 123,
        EditCursorColor: new RGBColor(1, 1, 1),
    });
    const textArea = new FrameTextArea("TestTextArea", {
        Width: 0.024,
        TextAreaLineGap: 0.33,
        TextAreaLineHeight: 0.02,
        TextAreaInset: 0.03,
        TextAreaScrollBar: frameScrollbar
    });
    const simpleFrame = new FrameSimpleFrame("TestSimple", {
        DecorateFileNames: true,
        Children: [
          new FrameTexture({
              InheritsFrom: "ResourceBarIconTemplate",
              Anchors: [new Anchor(PAlign.TOPLEFT, 0.0, -0.003125)],
              File: "GoldIcon",
          }),
          new FrameString("testString",{
              InheritsFrom: "ResourceBarTextTemplate",
              Anchors: [new Anchor(PAlign.TOPRIGHT, -0.267, -0.003125)],
              Width: 0.054875,
              Font: new Font(BaseFonts.MasterFont, 0.01)
          }),
        ],
    });
    const frameLayer = new FrameLayer("ARTWORK", {
       Children: [new FrameTexture({File: "cum.jpeg"})]
    });
    const frameSimpleButton = new FrameSimpleButton("TestFrameSimpleButton", {
        Width: 0.39,
        Height: 0.39,
    });
    const frameSimpleCheckbox = new FrameSimpleCheckbox("TestFrameSimpleCheckbox", {
        NormalTexture: "Normal",
        PushedTexture: "Poosh",
        CheckedTexture: "Cheeked",
    });
    const frameSimpleStatusBar = new FrameSimpleStatusBar("TestFrameSimpleStatusBar", {
        BarTexture: "MyHP.dds",
    });
    return [
        backdrop,
        highlight,
        glueTextButton,
        text,
        frameSlider,
        frameScrollbar,
        menu,
        button,
        popupMenu,
        glueCheckBox,
        editBox,
        textArea,
        simpleFrame,
        frameLayer,
        frameSimpleButton,
        frameSimpleCheckbox,
        frameSimpleStatusBar,
    ];
}