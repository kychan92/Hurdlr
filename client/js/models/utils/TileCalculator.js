import { TileGenerator } from "./TileGenerator";

export class TileCalculator
{
    constructor(tileGenerator)
    {
        this.tileGenerator = tileGenerator;
    }

    getHeightByWidth(width)
    {
        let index = this.getTileIndexByWidth(width);
        let rw    = index * this.tileGenerator.BLOCK_WIDTH;
        let rh    = this.getTile(index) * this.tileGenerator.BLOCK_HEIGHT;
        let dx    = width - rw;

        let remainder = dx * (this.tileGenerator.BLOCK_HEIGHT / this.tileGenerator.BLOCK_WIDTH);
        let slope     = this.getSlopeByWidth(width) * remainder || 0;

        let height = rh + slope;

        return window.innerHeight - height;
    }

    getTileIndexByWidth(width)
    {
        return Math.floor(width / this.tileGenerator.BLOCK_WIDTH);
    }

    getTile(tileIndex)
    {
        return this.tileGenerator.tiles[tileIndex];
    }

    getSlopeByWidth(width)
    {
        let tileIndex = this.getTileIndexByWidth(width);

        let height     = this.getTile(tileIndex);
        let nextHeight = this.getTile(tileIndex + 1) || height;

        return nextHeight - height;
    }
}