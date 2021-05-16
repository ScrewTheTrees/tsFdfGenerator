import {Root} from "./src/fdf/Root";
import {FrameDialog} from "./src/fdf/FrameDialog";
import {FrameBackdrop} from "./src/fdf/FrameBackdrop";
import {BaseBackgrounds} from "./src/base/BaseBackgrounds";
import {CornerFlags, CornerFlagsAll} from "./src/base/CornerFlags";
import {Vector4} from "./src/other/Vector4";
import {BaseBorders} from "./src/base/BaseBorders";
import {StringStream} from "./src/StringStream";
import {FontJustify, FrameText} from "./src/fdf/FrameText";
import {PointAlign, SetPoint} from "./src/fdf/SetPoint";

const fs = require('fs');


let allianceBackdrop = new FrameBackdrop("AllianceBackdropCustom", {
    decorateFileName: true,
    backdropTileBackground: true,
    backdropBackground: BaseBackgrounds.EscMenuBackground,
    backdropEdgeFile: BaseBorders.EscMenuBorder,
    backdropBackgroundSize: 0.128,
    backdropBackgroundInsets: new Vector4(0.01, 0.01, 0.01, 0.01),
    backdropCornerFlags: new Set<CornerFlags>(CornerFlagsAll),
});

let allianceDialog = new FrameDialog("AllianceDialogCustom", {
    height: 0.576,
    width: 0.48,
    children: [allianceBackdrop],
    dialogBackdrop: allianceBackdrop,
});
let allianceTitle = new FrameText("AllianceTitleCustom", {
    points: [
        new SetPoint(PointAlign.TOPLEFT, allianceDialog, PointAlign.TOPLEFT, 0.03375, -0.03),
    ],
    fontJustificationH: FontJustify.JUSTIFYLEFT,
    text: "ALLIANCES"
});


allianceDialog.addChild(allianceTitle);

const root = new Root({
    children: [allianceDialog]
});


const stream = new StringStream();
root.writeToString(stream);

if (!fs.existsSync("./target")) {
    fs.mkdir("./target", console.log);
}
fs.writeFileSync("./target/test.txt", stream.data);