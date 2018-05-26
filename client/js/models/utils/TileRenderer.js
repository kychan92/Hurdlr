export class TileRenderer
{
    constructor(tileGenerator)
    {
        this.tileGenerator = tileGenerator;
    }

    render(ctx)
    {
        ctx.beginPath();
        ctx.moveTo(0, this.tileGenerator.tiles[0] * this.tileGenerator.blockHeight);

        this.tileGenerator.tiles.forEach((height, i) => {
            let x = i * this.tileGenerator.blockWidth - this.tileGenerator.offset;
            let y = window.innerHeight - (height * this.tileGenerator.blockHeight);
            ctx.lineTo(x, y);
        });

        ctx.lineTo(window.innerWidth, window.innerHeight);
        ctx.lineTo(0, window.innerHeight);
        ctx.fill();
    }
}