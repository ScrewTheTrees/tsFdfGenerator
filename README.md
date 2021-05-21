# ts-fdf-generator

Use typescript to build WC3 UI.

1) Use OOP and Typescript to build FDF files.
2) Generate FDF files that you can save where you need it.
3) Generate TS definitions to use in the map.

# Functional example

```typescript
let allianceDialog = new FrameDialog("AllianceDialog", {
    Height: 0.576,
    Width: 0.48,
    Children: [allianceBackdrop],
    DialogBackdrop: allianceBackdrop,
});
const allianceDialogRoot = new Root({
    Children: [allianceDialog],
    IncludeFiles: ["UI\\FrameDef\\UI\\EscMenuTemplates.fdf"], //Usually not needed
});

//Generate FDF
fs.writeFileSync("./testAllianceDialog.fdf", allianceDialogRoot.compileFDFFile().data);
//Generate Classes
const textCase: Map<string, string> = allianceDialogRoot.compileClasses("TestUIRoot");
textCase.forEach(((value, key) => { //Where Value is the file contents and Key is the main class name.
    fs.writeFileSync(`./target/generated/${key}.ts`, value);
}));
```

# OOP/Classes

Naturally it fully supports OOP due to the internal class structure.

```typescript
export class FrameSimpleButtonCustomThing extends FrameSimpleButton {
    public constructor(name: string, args?: FrameSimpleButtonArgs) {
        super(name);
        this.DecorateFileNames = true;
        this.Width = 0.0032;
        this.Height = 0.0323;
        
        this.mergeArgs(args);
    }
}
const root = new Root({
    Children: [
        new FrameSimpleButtonCustomThing("FrameSimpleButtonCustomThing", {
          Height: 0.0032,  
        }),
    ]
});
```