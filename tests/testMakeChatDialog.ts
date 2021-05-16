import {FrameFrame} from "../src/fdf/FrameFrame";
import {FrameBackdrop} from "../src/fdf/FrameBackdrop";
import {BaseBackgrounds} from "../src/base/BaseBackgrounds";
import {CornerFlagsAll} from "../src/base/CornerFlags";
import {Vector4} from "../src/other/Vector4";
import {BaseBorders} from "../src/base/BaseBorders";
import {FrameText} from "../src/fdf/FrameText";
import {PointAlign, SetPoint} from "../src/fdf/subtypes/SetPoint";
import {FontJustify} from "../src/fdf/subtypes/FontJustify";
import {BaseFrames} from "../src/base/BaseFrames";
import {FrameGlueCheckbox} from "../src/fdf/FrameGlueCheckbox";
import {Color} from "../src/other/Color";
import {FramePopupMenu} from "../src/fdf/FramePopupMenu";
import {FrameGlueTextButton} from "../src/fdf/FrameGlueTextButton";
import {FrameButton} from "../src/fdf/FrameButton";
import {FrameMenu} from "../src/fdf/FrameMenu";

export function testMakeChatDialog() {
    let chatDialog = new FrameFrame("ChatDialog", {
        Width: 0.384,
        Height: 0.432,
        Children: [
            new FrameBackdrop("ChatBackdrop", {
                SetAllPoints: true,
                DecorateFileNames: true,
                BackdropTileBackground: true,
                BackdropBlendAll: true,
                BackdropBackground: BaseBackgrounds.EscMenuBackground,
                BackdropEdgeFile: BaseBorders.EscMenuBorder,
                BackdropCornerFlags: CornerFlagsAll(),
                BackdropCornerSize: 0.048,
                BackdropBackgroundSize: 0.128,
                BackdropBackgroundInsets: new Vector4(0.01, 0.01, 0.01, 0.01),
            }),
        ]
    });
    let chatTitle = new FrameText("ChatTitle", {
        InheritsFrom: BaseFrames.EscMenuTitleTextTemplate,
        Points: [new SetPoint(PointAlign.TOP, chatDialog, PointAlign.TOP, 0.0, -0.03)],
        FontJustificationH: FontJustify.JUSTIFYCENTER,
        Text: "MESSAGING"
    });
    let chatPlayerRadioButton = new FrameGlueCheckbox("ChatPlayerRadioButton", {
        InheritsFrom: BaseFrames.EscMenuRadioButtonTemplate, InheritsWithChildren: true,
        Points: [new SetPoint(PointAlign.TOPLEFT, chatDialog, PointAlign.TOPLEFT, 0.035, -0.070375)],
    });
    let chatAlliesRadioButton = new FrameGlueCheckbox("ChatAlliesRadioButton", {
        InheritsFrom: BaseFrames.EscMenuRadioButtonTemplate, InheritsWithChildren: true,
        Points: [new SetPoint(PointAlign.TOP, chatPlayerRadioButton, PointAlign.BOTTOM, 0.0, -0.012)],
    });
    let chatObserversRadioButton = new FrameGlueCheckbox("ChatObserversRadioButton", {
        InheritsFrom: BaseFrames.EscMenuRadioButtonTemplate, InheritsWithChildren: true,
        Points: [new SetPoint(PointAlign.TOP, chatAlliesRadioButton, PointAlign.BOTTOM, 0.0, -0.002)],
    });
    let chatEveryoneRadioButton = new FrameGlueCheckbox("ChatEveryoneRadioButton", {
        InheritsFrom: BaseFrames.EscMenuRadioButtonTemplate, InheritsWithChildren: true,
        Points: [new SetPoint(PointAlign.TOP, chatObserversRadioButton, PointAlign.BOTTOM, 0.0, -0.002)],
    });
    let chatPlayerLabel = new FrameText("ChatPlayerLabel", {
        InheritsFrom: BaseFrames.EscMenuInfoTextTemplate, InheritsWithChildren: true,
        FontColor: new Color(0.99, 0.827, 0.0705, 1.0),
        Points: [new SetPoint(PointAlign.LEFT, chatPlayerRadioButton, PointAlign.RIGHT, 0.005, 0.0)],
        Text: "COLON_SEND_TO_PLAYER",
    });
    let chatAlliesLabel = new FrameText("ChatAlliesLabel", {
        InheritsFrom: BaseFrames.EscMenuInfoTextTemplate, InheritsWithChildren: true,
        FontColor: new Color(0.99, 0.827, 0.0705, 1.0),
        Points: [new SetPoint(PointAlign.LEFT, chatPlayerRadioButton, PointAlign.RIGHT, 0.005, 0.0)],
        Text: "SEND_TO_ALLIES",
    });
    let chatObserversLabel = new FrameText("ChatObserversLabel", {
        InheritsFrom: BaseFrames.EscMenuInfoTextTemplate, InheritsWithChildren: true,
        FontColor: new Color(0.99, 0.827, 0.0705, 1.0),
        Points: [new SetPoint(PointAlign.LEFT, chatObserversRadioButton, PointAlign.RIGHT, 0.005, 0.0)],
        Text: "SEND_TO_OBSERVERS",
    });
    let chatEveryoneLabel = new FrameText("ChatEveryoneLabel", {
        InheritsFrom: BaseFrames.EscMenuInfoTextTemplate, InheritsWithChildren: true,
        FontColor: new Color(0.99, 0.827, 0.0705, 1.0),
        Points: [new SetPoint(PointAlign.LEFT, chatEveryoneRadioButton, PointAlign.RIGHT, 0.005, 0.0)],
        Text: "SEND_TO_EVERYONE",
    });

    chatDialog.addChild(chatTitle);
    chatDialog.addChild(chatPlayerRadioButton);
    chatDialog.addChild(chatAlliesRadioButton);
    chatDialog.addChild(chatObserversRadioButton);
    chatDialog.addChild(chatEveryoneRadioButton);
    chatDialog.addChild(chatPlayerLabel);
    chatDialog.addChild(chatAlliesLabel);
    chatDialog.addChild(chatObserversLabel);
    chatDialog.addChild(chatEveryoneLabel);

    let EscMenuPopupMenuBackdropTemplate = new FrameBackdrop("EscMenuPopupMenuBackdropTemplate", {
        InheritsFrom: BaseFrames.EscMenuButtonBackdropTemplate,
    });
    let EscMenuPopupMenuDisabledBackdropTemplate = new FrameBackdrop("EscMenuPopupMenuDisabledBackdropTemplate", {
        InheritsFrom: BaseFrames.EscMenuButtonDisabledBackdropTemplate,
    });
    let PopupMenuTitleTemplate = new FrameGlueTextButton("PopupMenuTitleTemplate", {
        InheritsFrom: BaseFrames.EscMenuPopupMenuTitleTemplate,
        InheritsWithChildren: true,
    });
    let PopupMenuArrowTemplate = new FrameButton("PopupMenuArrowTemplate", {
        InheritsFrom: BaseFrames.EscMenuPopupMenuArrowTemplate,
        InheritsWithChildren: true,
    });
    let PopupMenuMenuTemplate = new FrameMenu("PopupMenuMenuTemplate", {
        InheritsFrom: BaseFrames.EscMenuPopupMenuMenuTemplate,
        InheritsWithChildren: true,
    });

    let chatPlayerMenu = new FramePopupMenu("ChatPlayerMenu", {
        Width: 0.19625,
        Height: 0.03,
        PopupButtonInset: 0.01,
        Points: [new SetPoint(PointAlign.RIGHT, chatDialog, PointAlign.TOPRIGHT, -0.031, -0.0765)],
        ControlBackdrop: EscMenuPopupMenuBackdropTemplate,
        ControlDisabledBackdrop: EscMenuPopupMenuDisabledBackdropTemplate,
        PopupTitleFrame: PopupMenuTitleTemplate,
        PopupArrowFrame: PopupMenuArrowTemplate,
        PopupMenuFrame: PopupMenuMenuTemplate,

        Children: [
            EscMenuPopupMenuBackdropTemplate,
            EscMenuPopupMenuDisabledBackdropTemplate,
            PopupMenuTitleTemplate,
            PopupMenuArrowTemplate,
            PopupMenuMenuTemplate,
        ]
    });

    chatDialog.addChild(chatPlayerMenu);

    return chatDialog;
}