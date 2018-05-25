export class FloorCalculator
{
    constructor(floor)
    {
        this.floor = floor;
    }

    getHeightByOffset(offset)
    {
        offset += this.floor.offset;

        let index = this.getTileIndexByOffset(offset);
        let rw    = index * this.floor.blockWidth;
        let rh    = this.getTile(index) * this.floor.blockHeight;
        let dx    = offset - rw;

        let remainder = dx * (this.floor.blockHeight / this.floor.blockWidth);
        let slope     = this.getSlopeByOffsetWithoutFloorOffset(offset) * remainder || 0;

        let height = rh + slope;

        return height;
    }

    getSlopeByOffsetWithoutFloorOffset(offset)
    {
        let tileIndex = this.getTileIndexByOffset(offset);
    
        let height     = this.getTile(tileIndex);
        let nextHeight = this.getTile(tileIndex + 1) || height;
    
        return nextHeight - height;
    }

    getSlopeByOffset(offset)
    {
        return this.getSlopeByOffsetWithoutFloorOffset(offset + this.floor.offset);
    }

    getTileIndexByOffset(offset)
    {
        return Math.floor(offset / this.floor.blockWidth);
    }

    getTile(tileIndex)
    {
        return this.floor.locations[tileIndex];
    }
}