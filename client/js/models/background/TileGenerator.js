export class TileGenerator
{
    constructor(blockWidth, blockHeight, maxBlocks, minBlockHeight, maxBlockHeight)
    {
        this.blockWidth     = blockWidth;
        this.blockHeight    = blockHeight;
        this.maxBlocks      = maxBlocks;
        this.angle          = Math.atan2(blockHeight, blockWidth);
        this.minBlockHeight = minBlockHeight;
        this.maxBlockHeight = maxBlockHeight;

        this.locations = [];
        this.offset    = 0;

        this.populate();
    }

    populate()
    {
        for (let i = 0; i < this.maxBlocks; i++)
        {
            this.generate();
        }
    }

    generate()
    {
        let height = (this.locations.length > 0) ? this.locations[this.locations.length - 1] : this.minBlockHeight;
        height    += (Math.random() > .5) ? 1 : -1;

        if (height > this.maxBlockHeight) height = this.maxBlockHeight - 1;
        if (height < this.minBlockHeight) height = this.minBlockHeight + 1;

        this.locations.push(height);
    }

    next()
    {
        this.offset++;

        if (this.offset > this.blockWidth)
        {
            this.locations.shift();
            this.generate();
            this.offset-=this.blockWidth;
        }
    }
}