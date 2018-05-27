import { FloorCalculator } from "./FloorCalculator";

export class Floor
{
    constructor(minBlockHeight, maxBlockHeight)
    {
        this.blockWidth     = 90;
        this.blockHeight    = 40;
        this.maxBlocks      = 100;
        this.minBlockHeight = 2;
        this.maxBlockHeight = 9;
        this.angle          = Math.atan2(this.blockHeight, this.blockWidth);
        this.offset         = 0;
        this.updated        = true;
        this.calculator     = new FloorCalculator(this);
        this.locations      = [this.minBlockHeight];

        for (let i=0; i<this.maxBlocks; i++)
        {
            this.next();
        }
    }

    setOffset(offset)
    {
        if (offset > 0.2)
        {
            this.updated = true;
        }

        this.offset      += offset;

        if (this.offset > this.blockWidth)
        {
            this.offset -= this.blockWidth;
            this.next();
        }
    }

    next()
    {
        let height = this.locations[ this.locations.length - 1 ] + ((Math.random() > .5) ? 1 : -1);
        if (height > this.maxBlockHeight) height = this.maxBlockHeight;
        if (height < this.minBlockHeight) height = this.minBlockHeight;

        if (this.locations.length >= 50)
        {
            this.locations.shift();
        }

        this.locations.push(height);

        return height;
    }

    getHeight(offset)
    {
        let index = this.getTileIndexByWidth(width);
        let rw    = index * this.tileGenerator.BLOCK_WIDTH;
        let rh    = this.getTile(index) * this.tileGenerator.BLOCK_HEIGHT;
        let dx    = width - rw;

        let remainder = dx * (this.tileGenerator.BLOCK_HEIGHT / this.tileGenerator.BLOCK_WIDTH);
        let slope     = this.getSlopeByWidth(width) * remainder || 0;

        let height = rh + slope;

        return 1080 - height;
    }
}