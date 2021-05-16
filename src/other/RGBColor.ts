export class RGBColor {
    public r: number = 0;
    public g: number = 0;
    public b: number = 0;

    public constructor(r?: number, g?: number, b?: number) {
        if (r) this.r = r;
        if (g) this.g = g;
        if (b) this.b = b;
    }
    public toString(): string {
        return `${this.r} ${this.g} ${this.b}`;
    }
}