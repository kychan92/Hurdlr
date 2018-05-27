import { TileGenerator } from "../TileGenerator";
import { TileRenderer } from "../TileRenderer";

export class Terrain
{
    constructor()
    {
        this.offset = 0;
        this.hills  = [
            new TileGenerator(300, 200, 50, 2, 4, 50),
            new TileGenerator(240, 190, 50, 3, 4, 50),
            new TileGenerator(175, 180, 50, 3, 4, 50),

            new TileGenerator(290, 165, 50, 2, 4, 50),
            new TileGenerator(230, 165, 50, 3, 4, 50),
            new TileGenerator(125, 140, 50, 3, 4, 50),

            new TileGenerator(235, 145, 50, 3, 4, 50),
            new TileGenerator(350, 130, 50, 3, 4, 50),
            new TileGenerator(190, 160, 50, 2, 4, 50),

            new TileGenerator(255, 120, 50, 3, 5, 50),
            new TileGenerator(205, 120, 50, 3, 4, 50),

            new TileGenerator(245, 100, 50, 3, 4, 50)
        ];

        this.renderer = new TileRenderer();
    }

    update()
    {
        this.hills.forEach(x => {
            x.next();
        });
    }

    createGradient(canvasHelper, color, strength)
    {
        let gradient = canvasHelper.context.createLinearGradient(window.innerWidth / 2,
                                                                 0,
                                                                 0,
                                                                 window.innerHeight);

        gradient.addColorStop(strength, color);
        gradient.addColorStop(1, "#FFFFFF");

        return gradient;
    }

    render(canvasHelper)
    {
        canvasHelper.context.filter = 'blur(2px)';
        canvasHelper.context.fillStyle = this.createGradient(canvasHelper, canvasHelper.color.HILLS_FAR, 0.15);
        this.renderer.render(canvasHelper, this.hills[0]);
        this.renderer.render(canvasHelper, this.hills[1]);
        this.renderer.render(canvasHelper, this.hills[2]);

        canvasHelper.context.fillStyle = this.createGradient(canvasHelper, canvasHelper.color.HILLS_FAR_NEAR, 0.25);
        this.renderer.render(canvasHelper, this.hills[3]);
        this.renderer.render(canvasHelper, this.hills[4]);
        this.renderer.render(canvasHelper, this.hills[5]);

        canvasHelper.context.fillStyle = this.createGradient(canvasHelper, canvasHelper.color.HILLS_NEAR, 0.4);
        this.renderer.render(canvasHelper, this.hills[6]);
        this.renderer.render(canvasHelper, this.hills[7]);
        this.renderer.render(canvasHelper, this.hills[8]);

        canvasHelper.context.fillStyle = this.createGradient(canvasHelper, canvasHelper.color.HILLS_NEAR_CLOSE, 0.65);
        this.renderer.render(canvasHelper, this.hills[9]);
        this.renderer.render(canvasHelper, this.hills[10]);

        canvasHelper.context.filter = 'blur(1px)';
        canvasHelper.context.fillStyle = canvasHelper.color.HILLS_CLOSE;
        this.renderer.render(canvasHelper, this.hills[11]);

        canvasHelper.context.filter = 'none';
    }
}