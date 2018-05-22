export class Tween
{
    constructor(tweenCommand, delay, stackable)
    {
        this.tweenCommand = tweenCommand;
        this.maxTicks     = delay;
        this.ticks        = (delay==null) ? null : 0;
        this.stackable    = stackable;
    }

    trigger()
    {
        if (this.ticks == null) return;
        if (this.ticks > 0 && !this.stackable) return;

        this.ticks = this.maxTicks;
    }

    tick()
    {
        if (this.ticks === 0) return;

        this.tweenCommand();
        if (this.ticks == null) return;

        this.ticks--;
        if (this.ticks < 0) this.ticks = 0;
    }
}