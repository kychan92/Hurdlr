export class TileGenerator
{
    constructor(blockWidth, blockHeight, maxBlocks, minBlockHeight, maxBlockHeight)
    {
        this.BLOCK_WIDTH      = blockWidth;
        this.BLOCK_HEIGHT     = blockHeight;
        this.MAX_BLOCKS       = maxBlocks;
        this.ANGLE            = Math.atan2(blockHeight, blockWidth);
        this.MIN_BLOCK_HEIGHT = minBlockHeight;
        this.MAX_BLOCK_HEIGHT = maxBlockHeight;

        this.tiles = [];
    }

    populate()
    {
        for (let i = 0; i < this.MAX_BLOCKS; i++)
        {
            this.generate();
        }
    }

    generate()
    {
        let height = (this.tiles.length > 0) ? this.tiles[this.tiles.length - 1] : this.MIN_BLOCK_HEIGHT;
        height    += (Math.random() > .5) ? 1 : -1;

        if (height > this.MAX_BLOCK_HEIGHT) height = this.MAX_BLOCK_HEIGHT;
        if (height < this.MIN_BLOCK_HEIGHT) height = this.MIN_BLOCK_HEIGHT;

        this.tiles.push(height);
    }

    next()
    {
        this.tiles.shift();
        this.generate();
    }
}