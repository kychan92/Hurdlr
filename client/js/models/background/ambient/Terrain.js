import { TileGenerator } from "../TileGenerator";
import { TileRenderer } from "../TileRenderer";

export class Terrain
{
    constructor()
    {
        this.offset = 0;
        this.hills  = [
            new TileGenerator(255, 100, 50, 6, 9, 50),
            new TileGenerator(205, 90, 50, 5, 8, 50),
            new TileGenerator(135, 80, 50, 4, 8, 50),

            new TileGenerator(235, 100, 50, 4, 7, 50),
            new TileGenerator(175, 105, 50, 3, 6, 50),
            new TileGenerator(105, 90, 50, 3, 6, 50),

            new TileGenerator(215, 100, 50, 3, 6, 50),
            new TileGenerator(165, 90, 50, 3, 5, 50),
            new TileGenerator(145, 105, 50, 3, 5, 50),

            new TileGenerator(255, 100, 50, 3, 5, 50),
            new TileGenerator(205, 120, 50, 3, 4, 50),

            new TileGenerator(245, 80, 50, 3, 5, 50)
        ];

        this.renderer = new TileRenderer();
    }

    update()
    {
        this.hills.forEach(x => {
            x.next();
        });
    }

    render(canvasHelper)
    {
        canvasHelper.context.filter = 'blur(2px)';
        canvasHelper.context.fillStyle = canvasHelper.color.HILLS_FAR;
        this.renderer.render(canvasHelper, this.hills[0]);
        this.renderer.render(canvasHelper, this.hills[1]);
        this.renderer.render(canvasHelper, this.hills[2]);

        canvasHelper.context.fillStyle = canvasHelper.color.HILLS_FAR_NEAR;
        this.renderer.render(canvasHelper, this.hills[3]);
        this.renderer.render(canvasHelper, this.hills[4]);
        this.renderer.render(canvasHelper, this.hills[5]);

        canvasHelper.context.fillStyle = canvasHelper.color.HILLS_NEAR;
        this.renderer.render(canvasHelper, this.hills[6]);
        this.renderer.render(canvasHelper, this.hills[7]);
        this.renderer.render(canvasHelper, this.hills[8]);

        canvasHelper.context.fillStyle = canvasHelper.color.HILLS_NEAR_CLOSE;
        this.renderer.render(canvasHelper, this.hills[9]);
        this.renderer.render(canvasHelper, this.hills[10]);

        canvasHelper.context.filter = 'blur(1px)';
        canvasHelper.context.fillStyle = canvasHelper.color.HILLS_CLOSE;
        this.renderer.render(canvasHelper, this.hills[11]);

        canvasHelper.context.filter = 'none';
    }
}