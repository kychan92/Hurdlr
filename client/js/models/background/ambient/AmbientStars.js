import { TickHelper } from "../../utils/TickHelper";
import { Star }       from "./Star";

export class AmbientStars
{
    constructor()
    {
        this.stars = [];

        this.starTicker = new TickHelper(25, () => {
            this.stars.push(new Star());
        });
    }

    render(canvasHelper)
    {
        this.starTicker.tick();

        this.stars.forEach((x, i) => {
            if (x.removed)
            {
                this.stars.splice(i, 1);
                return;
            }

            x.step();
            x.render(canvasHelper);
        });
    }
}