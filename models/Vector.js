export class Vector
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    clone()
    {
        return new Vector(this.x, this.y);
    }

    equals(vector)
    {
        return (this.x == vector.x && this.y == vector.y);
    }

    proximates(vector, offset)
    {
        return (vector.x > this.x - offset &&
                vector.x < this.x + offset &&
                vector.y > this.y - offset &&
                vector.y < this.y + offset);
    }
}