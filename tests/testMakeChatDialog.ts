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
        width: 0.384,
        height: 0.432,
        children: [
            new FrameBackdrop("ChatBackdrop", {
                setAllPoints: true,
                decorateFileName: true,
                backdropTileBackground: true,
                backdropBlendAll: true,
                backdropBackground: BaseBackgrounds.EscMenuBackground,
                backdropEdgeFile: BaseBorders.EscMenuBorder,
                backdropCornerFlags: CornerFlagsAll(),
                backdropCornerSize: 0.048,
                backdropBackgroundSize: 0.128,
                backdropBackgroundInsets: new Vector4(0.01, 0.01, 0.01, 0.01),
            }),
        ]
    });
    let chatTitle = new FrameText("ChatTitle", {
        inheritsFrom: BaseFrames.EscMenuTitleTextTemplate,
        points: [new SetPoint(PointAlign.TOP, chatDialog, PointAlign.TOP, 0.0, -0.03)],
        fontJustificationH: FontJustify.JUSTIFYCENTER,
        text: "MESSAGING"
    });
    let chatPlayerRadioButton = new FrameGlueCheckbox("ChatPlayerRadioButton", {
        inheritsFrom: BaseFrames.EscMenuRadioButtonTemplate, inheritsWithChildren: true,
        points: [new SetPoint(PointAlign.TOPLEFT, chatDialog, PointAlign.TOPLEFT, 0.035, -0.070375)],
    });
    let chatAlliesRadioButton = new FrameGlueCheckbox("ChatAlliesRadioButton", {
        inheritsFrom: BaseFrames.EscMenuRadioButtonTemplate, inheritsWithChildren: true,
        points: [new SetPoint(PointAlign.TOP, chatPlayerRadioButton, PointAlign.BOTTOM, 0.0, -0.012)],
    });
    let chatObserversRadioButton = new FrameGlueCheckbox("ChatObserversRadioButton", {
        inheritsFrom: BaseFrames.EscMenuRadioButtonTemplate, inheritsWithChildren: true,
        points: [new SetPoint(PointAlign.TOP, chatAlliesRadioButton, PointAlign.BOTTOM, 0.0, -0.002)],
    });
    let chatEveryoneRadioButton = new FrameGlueCheckbox("ChatEveryoneRadioButton", {
        inheritsFrom: BaseFrames.EscMenuRadioButtonTemplate, inheritsWithChildren: true,
        points: [new SetPoint(PointAlign.TOP, chatObserversRadioButton, PointAlign.BOTTOM, 0.0, -0.002)],
    });
    let chatPlayerLabel = new FrameText("ChatPlayerLabel", {
        inheritsFrom: BaseFrames.EscMenuInfoTextTemplate, inheritsWithChildren: true,
        fontColor: new Color(0.99, 0.827, 0.0705, 1.0),
        points: [new SetPoint(PointAlign.LEFT, chatPlayerRadioButton, PointAlign.RIGHT, 0.005, 0.0)],
        text: "COLON_SEND_TO_PLAYER",
    });
    let chatAlliesLabel = new FrameText("ChatAlliesLabel", {
        inheritsFrom: BaseFrames.EscMenuInfoTextTemplate, inheritsWithChildren: true,
        fontColor: new Color(0.99, 0.827, 0.0705, 1.0),
        points: [new SetPoint(PointAlign.LEFT, chatPlayerRadioButton, PointAlign.RIGHT, 0.005, 0.0)],
        text: "SEND_TO_ALLIES",
    });
    let chatObserversLabel = new FrameText("ChatObserversLabel", {
        inheritsFrom: BaseFrames.EscMenuInfoTextTemplate, inheritsWithChildren: true,
        fontColor: new Color(0.99, 0.827, 0.0705, 1.0),
        points: [new SetPoint(PointAlign.LEFT, chatObserversRadioButton, PointAlign.RIGHT, 0.005, 0.0)],
        text: "SEND_TO_OBSERVERS",
    });
    let chatEveryoneLabel = new FrameText("ChatEveryoneLabel", {
        inheritsFrom: BaseFrames.EscMenuInfoTextTemplate, inheritsWithChildren: true,
        fontColor: new Color(0.99, 0.827, 0.0705, 1.0),
        points: [new SetPoint(PointAlign.LEFT, chatEveryoneRadioButton, PointAlign.RIGHT, 0.005, 0.0)],
        text: "SEND_TO_EVERYONE",
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
        inheritsFrom: BaseFrames.EscMenuButtonBackdropTemplate,
    });
    let EscMenuPopupMenuDisabledBackdropTemplate = new FrameBackdrop("EscMenuPopupMenuDisabledBackdropTemplate", {
        inheritsFrom: BaseFrames.EscMenuButtonDisabledBackdropTemplate,
    });
    let PopupMenuTitleTemplate = new FrameGlueTextButton("PopupMenuTitleTemplate", {
        inheritsFrom: BaseFrames.EscMenuPopupMenuTitleTemplate,
        inheritsWithChildren: true,
    });
    let PopupMenuArrowTemplate = new FrameButton("PopupMenuArrowTemplate", {
        inheritsFrom: BaseFrames.EscMenuPopupMenuArrowTemplate,
        inheritsWithChildren: true,
    });
    let PopupMenuMenuTemplate = new FrameMenu("PopupMenuMenuTemplate", {
        inheritsFrom: BaseFrames.EscMenuPopupMenuMenuTemplate,
        inheritsWithChildren: true,
    });

    let chatPlayerMenu = new FramePopupMenu("ChatPlayerMenu", {
        width: 0.19625,
        height: 0.03,
        popupButtonInset: 0.01,
        points: [new SetPoint(PointAlign.RIGHT, chatDialog, PointAlign.TOPRIGHT, -0.031, -0.0765)],
        controlBackdrop: EscMenuPopupMenuBackdropTemplate,
        controlDisabledBackdrop: EscMenuPopupMenuDisabledBackdropTemplate,
        popupTitleFrame: PopupMenuTitleTemplate,
        popupArrowFrame: PopupMenuArrowTemplate,
        popupMenuFrame: PopupMenuMenuTemplate,

        children: [
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