export class ScoreHandler
{
    constructor()
    {
        this.top5    = [];
        this.updated = true;
    }

    update(players)
    {
        this.updated = false;

        players.forEach(x => {
            let p = this.top5.find(y => y.name == x.name);
            if (p)
            {
                return;
            }

            if (this.top5.length < 5)
            {
                this.top5.push(x);
                this.updated = true;
                return;
            }

            let pi = this.top5.findIndex(y => y.score < x.score);
            if (pi !== -1)
            {
                console.log(pi);
                this.top5.splice(pi, 1, x);
                this.updated = true;
            }
        });
    }

    getTop5()
    {
        return this.top5;
    }
}