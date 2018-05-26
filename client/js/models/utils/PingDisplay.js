export class PingDisplay
{
    constructor()
    {
        this.x = window.innerWidth - 325;
        this.y = 20;
        this.lastCheckTime = null;
        this.latency = 'TBA';

        window.addEventListener('resize', () => {
            this.x = window.innerWidth - 325;
        });
    }

    update()
    {
        let now = Date.now();
        if (this.lastCheckTime)
        {
            this.latency = Math.max(15, now - this.lastCheckTime);
        }

        this.lastCheckTime = now;
    }

    render(canvasHelper)
    {
        canvasHelper.context.font      = '15px Courier';
        canvasHelper.context.fillStyle = '#FFF';
        canvasHelper.context.fillText(this.latency, this.x, this.y);
    }
}