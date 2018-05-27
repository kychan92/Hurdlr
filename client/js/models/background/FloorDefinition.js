export class FloorDefinition
{
    constructor()
    {
        this.blockWidth     = 90;
        this.blockHeight    = 40;
        this.maxBlocks      = 100;
        this.minBlockHeight = 2;
        this.maxBlockHeight = 9;
        this.angle          = Math.atan2(this.blockHeight, this.blockWidth);
        this.offset         = 0;
        this.locations      = [this.minBlockHeight];
    }
}