import {FrameBackdrop} from "../src/fdf/FrameBackdrop";
import {BaseBackgrounds} from "../src/base/BaseBackgrounds";
import {BaseBorders} from "../src/base/BaseBorders";
import {Vector4} from "../src/other/Vector4";
import {CornerFlagsAll} from "../src/base/CornerFlags";
import {FrameDialog} from "../src/fdf/FrameDialog";
import {FrameText} from "../src/fdf/FrameText";
import {BaseFrames} from "../src/base/BaseFrames";
import {PointAlign, SetPoint} from "../src/fdf/SetPoint";
import {FontJustify} from "../src/fdf/FontJustify";
import {FrameGlueTextButton} from "../src/fdf/FrameGlueTextButton";

export function testMakeAllianceDialog() {
    let allianceBackdrop = new FrameBackdrop("AllianceBackdropCustom", {
        decorateFileName: true,
        backdropTileBackground: true,
        backdropBackground: BaseBackgrounds.EscMenuBackground,
        backdropEdgeFile: BaseBorders.EscMenuBorder,
        backdropBackgroundSize: 0.128,
        backdropBackgroundInsets: new Vector4(0.01, 0.01, 0.01, 0.01),
        backdropCornerFlags: CornerFlagsAll(),
    });

    let allianceDialog = new FrameDialog("AllianceDialogCustom", {
        height: 0.576,
        width: 0.48,
        children: [allianceBackdrop],
        dialogBackdrop: allianceBackdrop,
    });
    let allianceTitle = new FrameText("AllianceTitleCustom", {
        inheritsFrom: BaseFrames.EscMenuTitleTextTemplate,
        points: [
            new SetPoint(PointAlign.TOPLEFT, allianceDialog, PointAlign.TOPLEFT, 0.03375, -0.03),
        ],
        fontJustificationH: FontJustify.JUSTIFYLEFT,
        text: "ALLIANCES"
    });
    let resourceTradingTitle = new FrameText("ResourceTradingTitleCustom", {
        inheritsFrom: BaseFrames.EscMenuTitleTextTemplate,
        points: [
            new SetPoint(PointAlign.TOPRIGHT, allianceDialog, PointAlign.TOPRIGHT, -0.045, -0.03),
        ],
        fontJustificationH: FontJustify.JUSTIFYLEFT,
        text: "RESOURCE_TRADING"
    });
    let playerHeaderCustom = new FrameText("PlayersHeaderCustom", {
        inheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        points: [
            new SetPoint(PointAlign.TOPLEFT, allianceDialog, PointAlign.TOPLEFT, 0.03625, -0.060875),
        ],
        text: "PLAYERS"
    });
    let allyHeaderCustom = new FrameText("AllyHeaderCustom", {
        inheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        width: 0.037,
        points: [
            new SetPoint(PointAlign.BOTTOMLEFT, playerHeaderCustom, PointAlign.BOTTOMLEFT, 0.221025, 0.0),
        ],
        fontJustificationH: FontJustify.JUSTIFYCENTER,
        text: "ALLY"
    });
    let visionHeaderCustom = new FrameText("VisionHeaderCustom", {
        inheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        width: 0.037,
        points: [
            new SetPoint(PointAlign.BOTTOMLEFT, allyHeaderCustom, PointAlign.BOTTOMRIGHT, 0.013, 0.0),
        ],
        fontJustificationH: FontJustify.JUSTIFYCENTER,
        text: "SHARE_VISION"
    });
    let unitsHeaderCustom = new FrameText("UnitsHeaderCustom", {
        inheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        width: 0.037,
        points: [
            new SetPoint(PointAlign.BOTTOMLEFT, visionHeaderCustom, PointAlign.BOTTOMRIGHT, 0.013, 0.0),
        ],
        fontJustificationH: FontJustify.JUSTIFYCENTER,
        text: "SHARE_UNITS"
    });
    let goldHeaderCustom = new FrameText("GoldHeaderCustom", {
        inheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        width: 0.048,
        points: [
            new SetPoint(PointAlign.BOTTOMLEFT, unitsHeaderCustom, PointAlign.BOTTOMRIGHT, 0.02275, 0.0),
        ],
        fontJustificationH: FontJustify.JUSTIFYCENTER,
        text: "GOLD"
    });
    let lumberHeaderCustom = new FrameText("LumberHeaderCustom", {
        inheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        width: 0.048,
        points: [
            new SetPoint(PointAlign.BOTTOMLEFT, goldHeaderCustom, PointAlign.BOTTOMRIGHT, 0.01, 0.0),
        ],
        fontJustificationH: FontJustify.JUSTIFYCENTER,
        text: "LUMBER"
    });
    allianceDialog.addChild(allianceTitle);
    allianceDialog.addChild(resourceTradingTitle);
    allianceDialog.addChild(playerHeaderCustom);
    allianceDialog.addChild(allyHeaderCustom);
    allianceDialog.addChild(visionHeaderCustom);
    allianceDialog.addChild(unitsHeaderCustom);
    allianceDialog.addChild(goldHeaderCustom);
    allianceDialog.addChild(lumberHeaderCustom);

    let allianceAcceptButton = new FrameGlueTextButton("AllianceAcceptButtonCustom", {
        inheritsFrom: BaseFrames.EscMenuButtonTemplate,
        inheritsWithChildren: true,
        width: 0.13,
        points: [
            new SetPoint(PointAlign.BOTTOMRIGHT, allianceDialog, PointAlign.BOTTOM, -0.003, 0.03),
        ],
        buttonText: "AllianceAcceptButtonText",
        children: [
            new FrameText("AllianceAcceptButtonTextCustom", {
               inheritsFrom: BaseFrames.EscMenuButtonTextTemplate,
                text: "ACCEPT",
            }),
        ]
    });
    let allianceCancelButton = new FrameGlueTextButton("AllianceCancelButtonCustom", {
        inheritsFrom: BaseFrames.EscMenuButtonTemplate,
        inheritsWithChildren: true,
        width: 0.13,
        points: [
            new SetPoint(PointAlign.LEFT, allianceAcceptButton, PointAlign.RIGHT, 0.005, 0.0),
        ],
        buttonText: "AllianceCancelButtonText",
        children: [
            new FrameText("AllianceCancelButtonTextCustom", {
               inheritsFrom: BaseFrames.EscMenuButtonTextTemplate,
                text: "CANCEL",
            }),
        ]
    });

    allianceDialog.addChild(allianceAcceptButton);
    allianceDialog.addChild(allianceCancelButton);

    return allianceDialog;
}