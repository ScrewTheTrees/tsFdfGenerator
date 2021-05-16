export class StringStream {
    public data: string = "";
    public indentation: number = 0;

    public pushIndent() {
        this.indentation += 1;
        return this;
    }
    public popIndent() {
        this.indentation -= 1;
        if (this.indentation < 0) this.indentation = 0;
        return this;
    }
    public writeIndentation() {
        for (let i = 0; i < this.indentation; i++) {
            this.writeString("    ");
        }
        return this;
    }
    public writeString(str: string) {
        this.data += str;
        return this;
    }
}