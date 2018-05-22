import { TileGenerator } from "./../utils/TileGenerator";
import { TileRenderer } from "./../utils/TileRenderer";
import { Star } from "./Star";
import { TickHelper } from "../utils/TickHelper";

export class Background
{
    constructor()
    {
        this.tileGenerator = new TileGenerator(200, 80, 50, 4, 9);
        this.tileGenerator.populate();

        this.backgroundRenderer = new TileRenderer(this.tileGenerator);
        this.stars  = [];
        this.tileTicker = new TickHelper(80, () => {
            this.tileGenerator.next();
        });

        this.starTicker = new TickHelper(25, () => {
            this.stars.push(new Star());
        });
    }

    renderAmbientStars(context)
    {
        this.stars.forEach((x, i) => {
            if (x.removed)
            {
                this.stars.splice(i, 1);
                return;
            }

            x.step();
            x.render(context);
        });
    }

    render(canvasHelper)
    {
        this.tileTicker.tick();
        this.starTicker.tick();

        canvasHelper.context.fillStyle = canvasHelper.COLOR.STARS;
        this.renderAmbientStars(canvasHelper.context);

        canvasHelper.context.fillStyle = canvasHelper.COLOR.HILLS;
        this.backgroundRenderer.render(canvasHelper.context);
    }
}