export class TileRenderer
{
    constructor()
    {
    }

    render(canvasHelper, definition)
    {
        canvasHelper.context.beginPath();
        canvasHelper.context.moveTo(0, definition.locations[0] * definition.blockHeight);

        definition.locations.forEach((height, i) => {
            let x = i * definition.blockWidth - definition.offset;
            let y = window.innerHeight - (height * definition.blockHeight);
            canvasHelper.context.lineTo(x, y);
        });

        canvasHelper.context.lineTo(window.innerWidth, window.innerHeight);
        canvasHelper.context.lineTo(0, window.innerHeight);
        canvasHelper.context.fill();
    }
}