export class Color {
    public r: number = 0;
    public g: number = 0;
    public b: number = 0;
    public a: number = 0;

    public constructor(r?: number, g?: number, b?: number, a?: number) {
        if (r) this.r = r;
        if (g) this.g = g;
        if (b) this.b = b;
        if (a) this.a = a;
    }
    public toString(): string {
        return `${this.r} ${this.g} ${this.b} ${this.a}`;
    }
}