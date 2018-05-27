import { PaletteHelper } from "./utils/PaletteHelper";
import { TickHelper }    from "./utils/TickHelper";

const FILTER = 'brightness(90%)';

export class CanvasHelper
{
    constructor()
    {
        this.items = [];

        this.canvas  = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.color = new PaletteHelper();

        document.body.appendChild(this.canvas);

        this.context.filter = FILTER;
        window.addEventListener('resize', () => {
            this.canvas.width   = window.innerWidth;
            this.canvas.height  = window.innerHeight;
            this.context.filter = FILTER;
        });
    }

    add(item)
    {
        this.items.push(item);
    }

    remove(item)
    {
        let index = this.items.indexOf(item);
        if (index !== -1) this.items[index].removed = true;
    }

    stop()
    {
        this.stopped = true;
    }

    render()
    {
        this.context.fillStyle = this.color.BACKGROUND;
        this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);

        this.items.forEach((x, i) => {
            if (x.removed)
            {
                this.items.splice(i, 1);
                return;
            }

            x.render(this);
        });

        if (this.stopped) return;
        window.requestAnimationFrame(() => this.render());
    }
}