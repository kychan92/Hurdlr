module.exports = function(minBlockHeight, maxBlockHeight)
{
    this.minBlockHeight = minBlockHeight;
    this.maxBlockHeight = maxBlockHeight;
    this.floors         = [this.minBlockHeight];

    this.initialize = () => {
        for (let i=0; i<50; i++)
        {
            this.next();
        }
    }

    this.next = () =>
    {
        let height = this.floors[ this.floors.length - 1 ] + ((Math.random() > .5) ? 1 : -1);
        if (height > this.maxBlockHeight) height = this.maxBlockHeight;
        if (height < this.minBlockHeight) height = this.minBlockHeight;

        if (this.floors.length >= 50)
        {
            this.floors.shift();
        }

        this.floors.push(height);

        return height;
    }

    this.initialize();
}