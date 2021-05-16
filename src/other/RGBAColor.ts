import {RGBColor} from "./RGBColor";

export class RGBAColor extends RGBColor {
    public a: number = 0;

    public constructor(r?: number, g?: number, b?: number, a?: number) {
        super(r, g, b);
        if (a) this.a = a;
    }
    public toString(): string {
        return `${this.r} ${this.g} ${this.b} ${this.a}`;
    }
}