import { TileGenerator } from "./utils/TileGenerator";
import { TileRenderer }  from "./utils/TileRenderer";

export class Floor
{
    constructor()
    {
        this.floorGenerator = new TileGenerator(90, 30, 40, 2, 2);
        this.floorRenderer  = new TileRenderer(this.floorGenerator);
    }

    render(canvasHelper)
    {
        canvasHelper.context.fillStyle = canvasHelper.COLOR.FLOOR;

        this.floorRenderer.render(canvasHelper.context);
    }
}