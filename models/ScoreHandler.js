export class ScoreHandler
{
    constructor()
    {
        this.top5 = [{
            name  : 'Kai',
            score : 50000
        }];
    }

    add(player)
    {
        let index = this.top5.findIndex(x => x.name == player.name);
        if (index !== -1)
        {
            if (player.score > this.top5[index].score)
            {
                this.top5[index].score = player.score;
            }

            return;
        }

        this.top5.push({
            id    : player.id,
            name  : player.name,
            score : player.score
        });
    }

    update(players)
    {
        players.forEach(player => {
            if (this.top5.length < 5)
            {
                return this.add(player);
            }

            let index = this.top5.findIndex(x => x.score < player.score);
            if (index !== -1)
            {
                this.top5.splice(index, 1);
                this.add(player);
            }
        });

        this.top5.sort((a, b) => a.score < b.score);
    }

    getTop5()
    {
        return this.top5;
    }
}