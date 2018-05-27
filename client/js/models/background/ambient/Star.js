const SPEED     = 5;
const SIZE      = 8;
const MIN_ANGLE = Math.PI + (Math.PI * 0.25);

export class Star
{
    constructor()
    {
        this.x     = Math.random() * window.innerWidth;
        this.y     = 0;
        this.angle = MIN_ANGLE + (Math.random() * (Math.PI * 0.5));
    }

    step()
    {
        this.x += Math.cos(this.angle) * SPEED;
        this.y -= Math.sin(this.angle) * SPEED;

        if (this.outOfBounds())
        {
            this.removed = true;
        }
    }

    render(canvasHelper)
    {
        canvasHelper.context.fillStyle = canvasHelper.color.STARS;
        canvasHelper.context.fillRect(this.x, this.y, SIZE, SIZE);
    }

    outOfBounds()
    {
        if (this.x < 0 || this.y < 0 || this.y > window.innerHeight)
        {
            return true;
        }

        return false;
    }
}