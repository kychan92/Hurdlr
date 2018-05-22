module.exports = function(players)
{
    this.initialize = () => {
        this.players = players;
        this.top5    = [];
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

        // let top5 = this.top5.concat(this.players.filter(x => x.user));
        // top5.sort((a, b) => a.user.score < b.user.score);
        // this.top5 = [];

        // top5.forEach((x, i) => {
        //     if (this.top5.find(y => y.name == x.name))
        //     {
        //         return;
        //     }

        //     if (this.top5.length < 5)
        //     {
        //         this.top5.push(x);
        //     }
        // });
    };

    this.getTop5 = () =>
    {
        return this.top5.map(x => `${x.name} - ${x.score}`);;
    }

    this.initialize();
}