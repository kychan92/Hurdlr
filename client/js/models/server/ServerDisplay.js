export class ServerDisplay
{
    constructor()
    {
        this.container    = document.createElement('div');
        this.container.id = 'server-display';

        document.body.appendChild(this.container);
    }

    getTop5(list, identifier)
    {
        let top5 = document.createElement('div');
        top5.className = 'top5';

        if (list.length > 0)
        {
            top5.innerHTML = '<div class="title">top 5</div>';

            list.forEach(x => {
                top5.innerHTML += this.drawItem(x, identifier);
            });
        }

        return top5;
    }

    drawItem(item, name)
    {
        let ownerClass = (item.name == name) ? 'owner' : '';

        return `<div class="item ${ownerClass}"><span class="name">${item.name}</span><span class="score">${item.score}</span></div>`;
    }

    getUptime(time)
    {
        let uptime = document.createElement('div');
        uptime.className = 'uptime';
        uptime.innerHTML = `Running since ${time}`;

        return uptime;
    }

    getPlayers(list, name)
    {
        let players = document.createElement('div');
        players.className = 'players';
        players.innerHTML += '<div class="title">Players</div>';

        list.forEach(x => {
            if (x.name)
            {
                players.innerHTML += this.drawItem(x, name);
            }
            else
            {
                players.innerHTML += `<span><em>pending...</em></span>`;
            }
        });

        return players;
    }

    update(object, name)
    {
        this.container.innerHTML = '';

        this.container.appendChild(this.getUptime(object.uptime));
        this.container.appendChild(this.getTop5(object.top5, name));
        this.container.appendChild(this.getPlayers(object.players, name));
    }
}