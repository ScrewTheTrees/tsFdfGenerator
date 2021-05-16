import {Root} from "./src/fdf/Root";
import {StringStream} from "./src/StringStream";
import {testMakeAllianceDialog} from "./tests/testMakeAllianceDialog";

const fs = require('fs');

let allianceDialog = testMakeAllianceDialog();

const root = new Root({
    children: [allianceDialog],
    includeFiles: ["UI\\FrameDef\\UI\\EscMenuTemplates.fdf"],
});


const stream = new StringStream();
root.writeToString(stream);

if (!fs.existsSync("./target")) {
    fs.mkdir("./target", console.log);
}
fs.writeFileSync("./target/test.txt", stream.data);