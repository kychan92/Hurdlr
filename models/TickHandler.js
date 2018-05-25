export class TickHandler
{
    constructor(callback)
    {
        this.callback = callback;

        setInterval(() => this.callback(), 10);
    }
}