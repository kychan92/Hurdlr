export class InfoDisplay
{
    constructor()
    {
        this.container    = document.createElement('div');
        this.container.id = 'server-display';
        this.top5         = [];
        this.players      = [];
        this.name         = '';

        document.body.appendChild(this.container);
    }

    createTop5()
    {
        let div = document.createElement('div');
        div.className = 'top5';

        if (this.top5.length > 0)
        {
            div.innerHTML = '<div class="title">top 5</div>';

            this.top5.forEach(x => {
                div.innerHTML += this.drawItem(x);
            });
        }

        return div;
    }

    drawItem(item)
    {
        let ownerClass = (item.name == this.name) ? 'owner' : '';

        return `<div class="item ${ownerClass}"><span class="name">${item.name}</span><span class="score">${item.score}</span></div>`;
    }

    createPlayersList()
    {
        let div = document.createElement('div');
        div.className = 'players';
        div.innerHTML += '<div class="title">Players</div>';

        this.players.forEach(x => {
            div.innerHTML += (x.name) ? this.drawItem(x) : `<span><em>pending...</em></span>`;
        });

        return div;
    }

    update(top5, players, name)
    {
        this.top5    = top5;
        this.players = players;
        this.name    = name;
    }

    draw()
    {
        this.container.innerHTML = '';

        this.container.appendChild(this.createTop5());
        this.container.appendChild(this.createPlayersList());
    }
}