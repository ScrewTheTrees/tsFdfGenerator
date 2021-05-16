import {Root} from "./src/fdf/Root";
import {StringStream} from "./src/StringStream";
import {testMakeAllianceDialog} from "./tests/testMakeAllianceDialog";
import {testMakeChatDialog} from "./tests/testMakeChatDialog";

const fs = require('fs');

let allianceDialog = testMakeAllianceDialog();
let chatDialog = testMakeChatDialog();

const root = new Root({
    children: [chatDialog, allianceDialog],
    includeFiles: ["UI\\FrameDef\\UI\\EscMenuTemplates.fdf"],
});


const stream = new StringStream();
root.writeToString(stream);

if (!fs.existsSync("./target")) {
    fs.mkdir("./target", console.log);
}
fs.writeFileSync("./target/test.txt", stream.data);