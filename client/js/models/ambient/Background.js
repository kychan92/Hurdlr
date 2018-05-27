import { TileGenerator } from "./../utils/TileGenerator";
import { TileRenderer }  from "./../utils/TileRenderer";
import { Star }          from "./Star";
import { TickHelper }    from "../utils/TickHelper";

export class Background
{
    constructor()
    {
        this.tileGenerator = new TileGenerator(150, 150, 50, 1, 7, true);
        this.tileGenerator.populate();

        this.backgroundRenderer = new TileRenderer(this.tileGenerator);
        this.stars              = [];

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
        this.starTicker.tick();

        canvasHelper.context.fillStyle = canvasHelper.COLOR.STARS;
        this.renderAmbientStars(canvasHelper.context);
        canvasHelper.context.fillStyle = canvasHelper.COLOR.HILLS;

        let alpha = canvasHelper.context.globalAlpha;
        canvasHelper.context.globalAlpha = 0.6;
        this.backgroundRenderer.render(canvasHelper.context);
        canvasHelper.context.globalAlpha = alpha;
    }
}