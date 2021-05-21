import {StringStream} from "../StringStream";
import {FrameBase} from "./FrameBase";


export type RootArgs = {
    Children?: FrameBase[],
    IncludeFiles?: string[]
};

export class Root {
    public Children: FrameBase[] = [];
    public IncludeFiles: string[] = [];

    constructor(args?: RootArgs) {
        if (args) Object.assign(this, args);
    }

    public addChild(frame: FrameBase) {
        this.Children.push(frame);
    }

    compileFile(): StringStream {
        const str: StringStream = new StringStream();
        if (this.IncludeFiles.length > 0) {
            str.writeString("//--Includes--\n");
            for (let file of this.IncludeFiles) {
                str.writeString(`IncludeFile "${file}",\n`);
            }
            str.writeString("\n");
        }
        if (this.Children.length > 0) {
            str.writeString("//--Frames--\n");
            for (let child of this.Children) {
                child.compileToStringStream(str);
            }
        }
        str.writeString("\n");
        return str;
    }

    public compileToClass(fileName: string) {
        let theClass = new StringStream();
        let theImports = new StringStream();
        let theFields = new StringStream();

        theClass.writeLine(`export class ${fileName} {`)
        theClass.pushIndent();
        theFields.pushIndent();

        theClass.writeIndentation().writeLine(`public frameContext: number;`);
        theClass.writeLine("");

        theClass.writeIndentation().writeLine(`public constructor(context: number) {`); //Start constructor.
        theClass.pushIndent().writeIndentation()
            .writeLine(`this.frameContext = context;`)

        for (let i = 0; i < this.Children.length; i++) {
            let child = this.Children[i];
            if (child.Name.length > 0) {
                //Write constructor
                theClass.writeIndentation()
                    .writeString(`this.${child.Name} = new ${child.Name}(this.frameContext);`);

                //Write fields
                theFields.writeIndentation()
                    .writeLine(`public ${child.Name}: ${child.Name};`);

                theImports.writeLine(`import {${child.Name}} from "./${child.Name}";`)
            }
            theClass.writeLine(`//Child ${i} ${child.constructor.name}`);
        }

        theClass.popIndent().writeIndentation().writeLine(`}`); //End Constructor.

        theClass.writeLine(theFields.data);

        theClass.popIndent();
        theClass.writeLine(`}`);
        return theImports.data + "\n\n" + theClass.data;
    }

    compileClasses(fileName: string) {
        const classes: Map<String, String> = new Map();

        classes.set(fileName, this.compileToClass(fileName));

        function traverse(frame: FrameBase, depth: number = 0) {
            if (classes.has(frame.Name)) {
                console.error(`Duplicated frame: ${frame.Name}`); //FUCK
            }
            if (frame.Name.length > 0) {
                classes.set(frame.Name, frame.compileToClass(depth));
            }
            for (let child of frame.Children) {
                //traverse(child, depth + 1);
            }
        }
        for (let child of this.Children) {
            traverse(child);
        }
        return classes;
    }
}