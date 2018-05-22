export class TickHelper
{
    constructor(maxTicks, callback)
    {
        this.ticks    = 0;
        this.maxTicks = maxTicks;
        this.callback = callback;
    }

    tick()
    {
        this.ticks++;

        if (this.ticks > this.maxTicks)
        {
            this.ticks = 0;
            this.callback();
        }
    }
}