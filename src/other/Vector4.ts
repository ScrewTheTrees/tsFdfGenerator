export class Vector4 {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public w: number = 0;

    public constructor(x?: number, y?: number, z?: number, w?: number) {
        if (x) this.x = x;
        if (y) this.y = y;
        if (z) this.z = z;
        if (w) this.w = w;
    }
    public toString(): string {
        return `${this.x} ${this.y} ${this.z} ${this.w}`;
    }
}


