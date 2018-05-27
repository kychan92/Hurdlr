const MAX_TICKS   = 200;
const TREE_CHANCE = 0.2;

const WIDTH  = 50;
const HEIGHT = 80;

export class TreePopulator
{
    constructor(floorGenerator)
    {
        this.floorGenerator = floorGenerator;

        this.trees = [];
        this.ticks = 0;
    }

    render(canvasHelper)
    {
        this.trees.forEach(x => {
            if (x.x < -50)
            {
                x.removed = true;
                return;
            }

            if (x.x > window.innerWidth + 50) return;

            this.draw(canvasHelper.context, x);
        });
    }

    tick()
    {
        this.ticks++;

        this.trees.forEach(x => {
            x.x--;
        });

        if (this.ticks > MAX_TICKS)
        {
            this.ticks = 0;

            if (Math.random() > TREE_CHANCE)
            {
                let last = this.floorGenerator.tiles[ this.floorGenerator.tiles.length - 1 ];
                this.trees.push({
                    x : (this.floorGenerator.tiles.length-1) * this.floorGenerator.blockWidth,
                    y : window.innerHeight - ((last * this.floorGenerator.blockHeight)) - HEIGHT
                });
            }
        }
    }

    draw(context, tree)
    {
        let dx = tree.x;

        context.fillStyle = '#FFFFFF55';
        context.beginPath();
        context.moveTo(dx + (WIDTH / 2), tree.y);
        context.lineTo(dx + WIDTH, tree.y + (HEIGHT * 0.75));
        context.lineTo(dx, tree.y + (HEIGHT * 0.75));
        context.fill();

        context.beginPath();
        context.moveTo(dx + (WIDTH / 2), tree.y);
        context.lineTo(dx + (WIDTH * 0.2), tree.y + (HEIGHT * 0.75));
        context.lineTo(dx, tree.y + (HEIGHT * 0.75));
        context.fill();

        context.fillStyle = '#FFFFFF33';
        context.fillRect(dx + (WIDTH * 0.4),
                         tree.y + (HEIGHT * 0.75),
                         (WIDTH * 0.2),
                         (HEIGHT * 0.3));

        context.fillRect(dx + (WIDTH * 0.4),
                         tree.y + (HEIGHT * 0.75),
                         (WIDTH * 0.04),
                         (HEIGHT * 0.3));

        context.fillRect(dx + (WIDTH * 0.44),
                         tree.y + (HEIGHT * 0.75),
                         (WIDTH * 0.16),
                         (HEIGHT * 0.02));
    }
}