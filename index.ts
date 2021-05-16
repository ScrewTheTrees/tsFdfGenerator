import {Root} from "./src/fdf/Root";
import {testMakeAllianceDialog} from "./tests/testMakeAllianceDialog";
import {testMakeChatDialog} from "./tests/testMakeChatDialog";

const fs = require('fs');

let allianceDialog = testMakeAllianceDialog();
let chatDialog = testMakeChatDialog();

const allianceDialogRoot = new Root({
    children: [allianceDialog],
    includeFiles: ["UI\\FrameDef\\UI\\EscMenuTemplates.fdf"],
});
const chatDialogRoot = new Root({
    children: [chatDialog],
    includeFiles: ["UI\\FrameDef\\UI\\EscMenuTemplates.fdf"],
});


if (!fs.existsSync("./target")) {
    fs.mkdir("./target", console.log);
}
fs.writeFileSync("./target/testAllianceDialog.txt", allianceDialogRoot.compileFile().data);
fs.writeFileSync("./target/testChatDialog.txt", chatDialogRoot.compileFile().data);