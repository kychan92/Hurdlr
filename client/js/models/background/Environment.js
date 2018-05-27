import { Terrain }         from "./ambient/Terrain";
import { AmbientStars }    from "./ambient/AmbientStars";
import { FloorDefinition } from "./FloorDefinition";
import { TileRenderer }    from "./TileRenderer";

export class Environment
{
    constructor()
    {
        this.floor        = new FloorDefinition();
        this.terrain      = new Terrain();
        this.ambientStars = new AmbientStars();
        this.tileRenderer = new TileRenderer();
    }

    update(data)
    {
        if (this.floor.offset != data.offset || this.floor.locations != data.locations)
        {
            this.floor.locations = data.locations;
            this.floor.offset    = data.offset;

            this.terrain.update();
        }
    }

    render(canvasHelper)
    {
        this.ambientStars.render(canvasHelper);

        this.terrain.render(canvasHelper);

        canvasHelper.context.fillStyle = canvasHelper.color.FLOOR;
        this.tileRenderer.render(canvasHelper, this.floor);
    }
}