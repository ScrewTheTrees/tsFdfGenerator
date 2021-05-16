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
import {FrameGlueCheckbox} from "../src/fdf/FrameGlueCheckbox";
import {FrameScrollBar} from "../src/fdf/FrameScrollbar";

export function testMakeAllianceDialog() {
    let allianceBackdrop = new FrameBackdrop("AllianceBackdrop", {
        decorateFileName: true,
        backdropTileBackground: true,
        backdropBackground: BaseBackgrounds.EscMenuBackground,
        backdropEdgeFile: BaseBorders.EscMenuBorder,
        backdropBackgroundSize: 0.128,
        backdropBackgroundInsets: new Vector4(0.01, 0.01, 0.01, 0.01),
        backdropCornerFlags: CornerFlagsAll(),
    });

    let allianceDialog = new FrameDialog("AllianceDialog", {
        height: 0.576,
        width: 0.48,
        children: [allianceBackdrop],
        dialogBackdrop: allianceBackdrop,
    });
    let allianceTitle = new FrameText("AllianceTitle", {
        inheritsFrom: BaseFrames.EscMenuTitleTextTemplate,
        points: [
            new SetPoint(PointAlign.TOPLEFT, allianceDialog, PointAlign.TOPLEFT, 0.03375, -0.03),
        ],
        fontJustificationH: FontJustify.JUSTIFYLEFT,
        text: "ALLIANCES"
    });
    let resourceTradingTitle = new FrameText("ResourceTradingTitle", {
        inheritsFrom: BaseFrames.EscMenuTitleTextTemplate,
        points: [
            new SetPoint(PointAlign.TOPRIGHT, allianceDialog, PointAlign.TOPRIGHT, -0.045, -0.03),
        ],
        fontJustificationH: FontJustify.JUSTIFYLEFT,
        text: "RESOURCE_TRADING"
    });
    let playerHeader = new FrameText("PlayersHeader", {
        inheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        points: [
            new SetPoint(PointAlign.TOPLEFT, allianceDialog, PointAlign.TOPLEFT, 0.03625, -0.060875),
        ],
        text: "PLAYERS"
    });
    let allyHeader = new FrameText("AllyHeader", {
        inheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        width: 0.037,
        points: [
            new SetPoint(PointAlign.BOTTOMLEFT, playerHeader, PointAlign.BOTTOMLEFT, 0.221025, 0.0),
        ],
        fontJustificationH: FontJustify.JUSTIFYCENTER,
        text: "ALLY"
    });
    let visionHeader = new FrameText("VisionHeader", {
        inheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        width: 0.037,
        points: [
            new SetPoint(PointAlign.BOTTOMLEFT, allyHeader, PointAlign.BOTTOMRIGHT, 0.013, 0.0),
        ],
        fontJustificationH: FontJustify.JUSTIFYCENTER,
        text: "SHARE_VISION"
    });
    let unitsHeader = new FrameText("UnitsHeader", {
        inheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        width: 0.037,
        points: [
            new SetPoint(PointAlign.BOTTOMLEFT, visionHeader, PointAlign.BOTTOMRIGHT, 0.013, 0.0),
        ],
        fontJustificationH: FontJustify.JUSTIFYCENTER,
        text: "SHARE_UNITS"
    });
    let goldHeader = new FrameText("GoldHeader", {
        inheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        width: 0.048,
        points: [
            new SetPoint(PointAlign.BOTTOMLEFT, unitsHeader, PointAlign.BOTTOMRIGHT, 0.02275, 0.0),
        ],
        fontJustificationH: FontJustify.JUSTIFYCENTER,
        text: "GOLD"
    });
    let lumberHeader = new FrameText("LumberHeader", {
        inheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        width: 0.048,
        points: [
            new SetPoint(PointAlign.BOTTOMLEFT, goldHeader, PointAlign.BOTTOMRIGHT, 0.01, 0.0),
        ],
        fontJustificationH: FontJustify.JUSTIFYCENTER,
        text: "LUMBER"
    });
    allianceDialog.addChild(allianceTitle);
    allianceDialog.addChild(resourceTradingTitle);
    allianceDialog.addChild(playerHeader);
    allianceDialog.addChild(allyHeader);
    allianceDialog.addChild(visionHeader);
    allianceDialog.addChild(unitsHeader);
    allianceDialog.addChild(goldHeader);
    allianceDialog.addChild(lumberHeader);

    let allianceAcceptButton = new FrameGlueTextButton("AllianceAcceptButton", {
        inheritsFrom: BaseFrames.EscMenuButtonTemplate,
        inheritsWithChildren: true,
        width: 0.13,
        points: [
            new SetPoint(PointAlign.BOTTOMRIGHT, allianceDialog, PointAlign.BOTTOM, -0.003, 0.03),
        ],
        buttonText: "AllianceAcceptButtonText",
        children: [
            new FrameText("AllianceAcceptButtonText", {
                inheritsFrom: BaseFrames.EscMenuButtonTextTemplate,
                text: "ACCEPT",
            }),
        ]
    });
    let allianceCancelButton = new FrameGlueTextButton("AllianceCancelButton", {
        inheritsFrom: BaseFrames.EscMenuButtonTemplate,
        inheritsWithChildren: true,
        width: 0.13,
        points: [
            new SetPoint(PointAlign.LEFT, allianceAcceptButton, PointAlign.RIGHT, 0.005, 0.0),
        ],
        buttonText: "AllianceCancelButtonText",
        children: [
            new FrameText("AllianceCancelButtonText", {
                inheritsFrom: BaseFrames.EscMenuButtonTextTemplate,
                text: "CANCEL",
            }),
        ]
    });
    let alliedVictoryCheckBox = new FrameGlueCheckbox("AlliedVictoryCheckBox", {
        inheritsFrom: BaseFrames.EscMenuCheckBoxTemplate,
        inheritsWithChildren: true,
        width: 0.024,
        height: 0.024,
        points: [
            new SetPoint(PointAlign.BOTTOM, allianceDialog, PointAlign.BOTTOM, -0.056875, 0.06875),
        ],
    });
    let alliedVictoryLabel = new FrameText("AlliedVictoryLabel", {
        points: [
            new SetPoint(PointAlign.LEFT, alliedVictoryCheckBox, PointAlign.RIGHT, 0.01, 0.0),
        ],
        text: "ALLIED_VICTORY",
    });
    let allianceDialogScrollBar = new FrameScrollBar("AllianceDialogScrollBar", {
        inheritsFrom: BaseFrames.StandardScrollBarTemplate,
        inheritsWithChildren: true,
    });

    allianceDialog.addChild(allianceAcceptButton);
    allianceDialog.addChild(allianceCancelButton);
    allianceDialog.addChild(alliedVictoryCheckBox);
    allianceDialog.addChild(alliedVictoryLabel);
    allianceDialog.addChild(allianceDialogScrollBar);

    return allianceDialog;
}