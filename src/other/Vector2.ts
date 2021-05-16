export class Vector2 {
    public x: number = 0;
    public y: number = 0;

    public constructor(x?: number, y?: number) {
        if (x) this.x = x;
        if (y) this.y = y;
    }
    public toString(): string {
        return `${this.x} ${this.y}`;
    }
}


