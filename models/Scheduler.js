const MAX_TICKS = 100;
const INTERVAL  = 100;

module.exports = function(callback)
{
    this.initialize = function()
    {
        setInterval(() => callback(), INTERVAL);
    }

    this.initialize();
}