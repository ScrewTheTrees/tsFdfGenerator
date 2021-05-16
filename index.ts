import {Root} from "./src/fdf/Root";
import {FrameDialog} from "./src/fdf/FrameDialog";
import {FrameBackdrop} from "./src/fdf/FrameBackdrop";
import {BaseBackgrounds} from "./src/base/BaseBackgrounds";
import {CornerFlags, CornerFlagsAll} from "./src/base/CornerFlags";
import {Vector4} from "./src/other/Vector4";
import {BaseBorders} from "./src/base/BaseBorders";
import {StringStream} from "./src/StringStream";

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

const root = new Root({
    children: [allianceDialog]
});


const stream = new StringStream();
root.writeToString(stream);

if (!fs.existsSync("./target")) {
    fs.mkdir("./target", console.log);
}
fs.writeFileSync("./target/test.txt", stream.data);