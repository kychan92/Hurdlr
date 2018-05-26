import { Palette } from "./utils/Palette";
import { TickHelper } from "./utils/TickHelper";

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

        this.palette = new Palette();
        this.COLOR   = this.palette.next();

        document.body.appendChild(this.canvas);

        this.paletteTicker = new TickHelper(10000, () => {
            this.COLOR = this.palette.next();
        });

        this.context.filter      = FILTER;
        window.addEventListener('resize', () => {
            this.canvas.width  = window.innerWidth;
            this.canvas.height = window.innerHeight;
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
        this.paletteTicker.tick();

        this.context.fillStyle = this.COLOR.BACKGROUND;
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