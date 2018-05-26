export class TileGenerator
{
    constructor(blockWidth, blockHeight, maxBlocks, minBlockHeight, maxBlockHeight, noFlats)
    {
        this.blockWidth     = blockWidth;
        this.blockHeight    = blockHeight;
        this.maxBlocks      = maxBlocks;
        this.angle          = Math.atan2(blockHeight, blockWidth);
        this.minBlockHeight = minBlockHeight;
        this.maxBlockHeight = maxBlockHeight;
        this.noFlats        = noFlats;

        this.tiles  = [];
        this.offset = 0;
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
        let height = (this.tiles.length > 0) ? this.tiles[this.tiles.length - 1] : this.minBlockHeight;
        height    += (Math.random() > .5) ? 1 : -1;

        if (height > this.maxBlockHeight) height = (this.noFlats) ? this.maxBlockHeight - 1 : this.maxBlockHeight;
        if (height < this.minBlockHeight) height = (this.noFlats) ? this.minBlockHeight + 1 : this.minBlockHeight;

        this.tiles.push(height);
    }

    next()
    {
        this.offset++;

        if (this.offset > this.blockWidth)
        {
            this.tiles.shift();
            this.generate();
            this.offset-=this.blockWidth;
        }
    }
}