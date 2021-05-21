import {Root} from "./src/fdf/Root";
import {testMakeAllianceDialog} from "./tests/testMakeAllianceDialog";
import {testMakeChatDialog} from "./tests/testMakeChatDialog";
import {testAll} from "./tests/testAll";
import {FrameBase} from "./src/fdf/FrameBase";

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


const classes: Set<String> = new Set();
function traverse(frame: FrameBase) {
    if (classes.has(frame.Name)) {
        console.error(`Duplicated frame: ${frame.Name}`); //FUCK
    }
    if (frame.Name.length > 0) {
        classes.add(frame.Name);
    }
    for (let child of frame.Children) {
        traverse(child);
    }
}
for (let child of testAllStuffRoot.Children) {
    traverse(child);
}
let testAllStuffClassDef = "export const enum Classes {\n";
classes.forEach((value) => {
    testAllStuffClassDef += `    ${value} = "${value}",\n`;
});
testAllStuffClassDef += "}\n"

if (!fs.existsSync("./target")) {
    fs.mkdir("./target", console.log);
}
fs.writeFileSync("./target/testAllianceDialog.txt", allianceDialogRoot.compileFDFFile().data);
fs.writeFileSync("./target/testChatDialog.txt", chatDialogRoot.compileFDFFile().data);
fs.writeFileSync("./target/testAllStuff.txt", testAllStuffRoot.compileFDFFile().data);
fs.writeFileSync("./target/testAllStuff.ts", testAllStuffClassDef);


const textCase: Map<string, string> = allianceDialogRoot.compileClasses("TestUIRoot");
if (!fs.existsSync("./target/classes")) {
    fs.mkdir("./target/classes", console.log);
}
textCase.forEach(((value, key) => {
    fs.writeFileSync(`./target/classes/${key}.ts`, value);
}));