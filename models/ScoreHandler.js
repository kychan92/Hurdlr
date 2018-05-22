module.exports = function(players)
{
    this.initialize = () => {
        this.players = players;
        this.top5    = [{
            name  : 'Kai',
            score : 50000
        }];
    }

    this.add = (player) => {
        let index = this.top5.findIndex(x => x.name == player.name);
        if (index !== -1)
        {
            if (player.user.score > this.top5[index].score)
            {
                this.top5[index].score = player.user.score;
            }

            return;
        }

        this.top5.push({
            name  : player.name,
            score : player.user.score
        });
    }

    this.update = () => {
        this.players.forEach(player => {
            if (!player.user) return;
            if (!player.name) return;

            if (this.top5.length < 5)
            {
                return this.add(player);
            }

            let index = this.top5.findIndex(x => x.score < player.user.score);
            if (index !== -1)
            {
                this.top5.splice(index, 1);
                this.add(player);
            }
        });

        this.top5.sort((a, b) => a.score < b.score);
    };

    this.getTop5 = () =>
    {
        return this.top5.map(x => `${x.name} - ${x.score}`);;
    }

    this.initialize();
}