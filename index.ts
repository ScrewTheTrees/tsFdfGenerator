import {Root} from "./src/fdf/Root";
import {testMakeAllianceDialog} from "./tests/testMakeAllianceDialog";
import {testMakeChatDialog} from "./tests/testMakeChatDialog";
import {testAll} from "./tests/testAll";

const fs = require('fs');

let allianceDialog = testMakeAllianceDialog();
let chatDialog = testMakeChatDialog();
let testAllStuff = testAll();

const allianceDialogRoot = new Root({
    Children: [allianceDialog],
    IncludeFiles: ["UI\\FrameDef\\UI\\EscMenuTemplates.fdf"],
});
const chatDialogRoot = new Root({
    Children: [chatDialog],
    IncludeFiles: ["UI\\FrameDef\\UI\\EscMenuTemplates.fdf"],
});
const testAllStuffRoot = new Root({
    Children: testAllStuff,
    IncludeFiles: ["UI\\FrameDef\\UI\\EscMenuTemplates.fdf"],
});


if (!fs.existsSync("./target")) {
    fs.mkdir("./target", console.log);
}
fs.writeFileSync("./target/testAllianceDialog.txt", allianceDialogRoot.compileFile().data);
fs.writeFileSync("./target/testChatDialog.txt", chatDialogRoot.compileFile().data);
fs.writeFileSync("./target/testAllStuff.txt", testAllStuffRoot.compileFile().data);