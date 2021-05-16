import {FrameBackdrop} from "../src/fdf/FrameBackdrop";
import {BaseBackgrounds} from "../src/base/BaseBackgrounds";
import {BaseBorders} from "../src/base/BaseBorders";
import {Vector4} from "../src/other/Vector4";
import {CornerFlagsAll} from "../src/fdf/subtypes/CornerFlags";
import {FrameDialog} from "../src/fdf/FrameDialog";
import {FrameText} from "../src/fdf/FrameText";
import {BaseFrames} from "../src/base/BaseFrames";
import {PointAlign, SetPoint} from "../src/fdf/subtypes/SetPoint";
import {FontJustify} from "../src/fdf/subtypes/FontJustify";
import {FrameGlueTextButton} from "../src/fdf/FrameGlueTextButton";
import {FrameGlueCheckbox} from "../src/fdf/FrameGlueCheckbox";
import {FrameScrollbar} from "../src/fdf/FrameScrollbar";

export function testMakeAllianceDialog() {
    let allianceBackdrop = new FrameBackdrop("AllianceBackdrop", {
        DecorateFileNames: true,
        BackdropTileBackground: true,
        BackdropBackground: BaseBackgrounds.EscMenuBackground,
        BackdropEdgeFile: BaseBorders.EscMenuBorder,
        BackdropBackgroundSize: 0.128,
        BackdropBackgroundInsets: new Vector4(0.01, 0.01, 0.01, 0.01),
        BackdropCornerFlags: CornerFlagsAll(),
    });

    let allianceDialog = new FrameDialog("AllianceDialog", {
        Height: 0.576,
        Width: 0.48,
        Children: [allianceBackdrop],
        DialogBackdrop: allianceBackdrop,
    });
    let allianceTitle = new FrameText("AllianceTitle", {
        InheritsFrom: BaseFrames.EscMenuTitleTextTemplate,
        Points: [
            new SetPoint(PointAlign.TOPLEFT, allianceDialog, PointAlign.TOPLEFT, 0.03375, -0.03),
        ],
        FontJustificationH: FontJustify.JUSTIFYLEFT,
        Text: "ALLIANCES"
    });
    let resourceTradingTitle = new FrameText("ResourceTradingTitle", {
        InheritsFrom: BaseFrames.EscMenuTitleTextTemplate,
        Points: [
            new SetPoint(PointAlign.TOPRIGHT, allianceDialog, PointAlign.TOPRIGHT, -0.045, -0.03),
        ],
        FontJustificationH: FontJustify.JUSTIFYLEFT,
        Text: "RESOURCE_TRADING"
    });
    let playerHeader = new FrameText("PlayersHeader", {
        InheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        Points: [
            new SetPoint(PointAlign.TOPLEFT, allianceDialog, PointAlign.TOPLEFT, 0.03625, -0.060875),
        ],
        Text: "PLAYERS"
    });
    let allyHeader = new FrameText("AllyHeader", {
        InheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        Width: 0.037,
        Points: [
            new SetPoint(PointAlign.BOTTOMLEFT, playerHeader, PointAlign.BOTTOMLEFT, 0.221025, 0.0),
        ],
        FontJustificationH: FontJustify.JUSTIFYCENTER,
        Text: "ALLY"
    });
    let visionHeader = new FrameText("VisionHeader", {
        InheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        Width: 0.037,
        Points: [
            new SetPoint(PointAlign.BOTTOMLEFT, allyHeader, PointAlign.BOTTOMRIGHT, 0.013, 0.0),
        ],
        FontJustificationH: FontJustify.JUSTIFYCENTER,
        Text: "SHARE_VISION"
    });
    let unitsHeader = new FrameText("UnitsHeader", {
        InheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        Width: 0.037,
        Points: [
            new SetPoint(PointAlign.BOTTOMLEFT, visionHeader, PointAlign.BOTTOMRIGHT, 0.013, 0.0),
        ],
        FontJustificationH: FontJustify.JUSTIFYCENTER,
        Text: "SHARE_UNITS"
    });
    let goldHeader = new FrameText("GoldHeader", {
        InheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        Width: 0.048,
        Points: [
            new SetPoint(PointAlign.BOTTOMLEFT, unitsHeader, PointAlign.BOTTOMRIGHT, 0.02275, 0.0),
        ],
        FontJustificationH: FontJustify.JUSTIFYCENTER,
        Text: "GOLD"
    });
    let lumberHeader = new FrameText("LumberHeader", {
        InheritsFrom: BaseFrames.EscMenuLabelTextSmallTemplate,
        Width: 0.048,
        Points: [
            new SetPoint(PointAlign.BOTTOMLEFT, goldHeader, PointAlign.BOTTOMRIGHT, 0.01, 0.0),
        ],
        FontJustificationH: FontJustify.JUSTIFYCENTER,
        Text: "LUMBER"
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
        InheritsFrom: BaseFrames.EscMenuButtonTemplate,
        InheritsWithChildren: true,
        Width: 0.13,
        Points: [
            new SetPoint(PointAlign.BOTTOMRIGHT, allianceDialog, PointAlign.BOTTOM, -0.003, 0.03),
        ],
        ButtonText: "AllianceAcceptButtonText",
        Children: [
            new FrameText("AllianceAcceptButtonText", {
                InheritsFrom: BaseFrames.EscMenuButtonTextTemplate,
                Text: "ACCEPT",
            }),
        ]
    });
    let allianceCancelButton = new FrameGlueTextButton("AllianceCancelButton", {
        InheritsFrom: BaseFrames.EscMenuButtonTemplate,
        InheritsWithChildren: true,
        Width: 0.13,
        Points: [
            new SetPoint(PointAlign.LEFT, allianceAcceptButton, PointAlign.RIGHT, 0.005, 0.0),
        ],
        ButtonText: "AllianceCancelButtonText",
        Children: [
            new FrameText("AllianceCancelButtonText", {
                InheritsFrom: BaseFrames.EscMenuButtonTextTemplate,
                Text: "CANCEL",
            }),
        ]
    });
    let alliedVictoryCheckBox = new FrameGlueCheckbox("AlliedVictoryCheckBox", {
        InheritsFrom: BaseFrames.EscMenuCheckBoxTemplate,
        InheritsWithChildren: true,
        Width: 0.024,
        Height: 0.024,
        Points: [
            new SetPoint(PointAlign.BOTTOM, allianceDialog, PointAlign.BOTTOM, -0.056875, 0.06875),
        ],
    });
    let alliedVictoryLabel = new FrameText("AlliedVictoryLabel", {
        Points: [
            new SetPoint(PointAlign.LEFT, alliedVictoryCheckBox, PointAlign.RIGHT, 0.01, 0.0),
        ],
        Text: "ALLIED_VICTORY",
    });
    let allianceDialogScrollBar = new FrameScrollbar("AllianceDialogScrollBar", {
        InheritsFrom: BaseFrames.StandardScrollBarTemplate,
        InheritsWithChildren: true,
    });

    allianceDialog.addChild(allianceAcceptButton);
    allianceDialog.addChild(allianceCancelButton);
    allianceDialog.addChild(alliedVictoryCheckBox);
    allianceDialog.addChild(alliedVictoryLabel);
    allianceDialog.addChild(allianceDialogScrollBar);

    return allianceDialog;
}