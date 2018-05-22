export class ServerDisplay
{
    constructor(identifier)
    {
        this.identifier = identifier;

        this.container = document.createElement('div');
        this.container.id = 'server-display';

        document.body.appendChild(this.container);
    }

    getTop5(list)
    {
        let top5 = document.createElement('div');
        top5.className = 'top5';

        if (list.length > 0)
        {
            top5.innerHTML = '<strong>top 5</strong>';

            list.forEach(x => {
                top5.innerHTML += `<span>${x}</span>`;
            });
        }

        return top5;
    }

    getUptime(time)
    {
        let uptime = document.createElement('div');
        uptime.className = 'uptime';
        uptime.innerHTML = `Running since ${time}`;

        return uptime;
    }

    getPlayers(list)
    {
        let players = document.createElement('div');
        players.className = 'players';

        list.forEach(x => {
            if (x.name)
            {
                players.innerHTML += (x.name == this.identifier) ? `<span><strong>${x.name}</strong></span>` : `<span>${x.name}</span>`;
            }
            else
            {
                players.innerHTML += `<span><em>pending...</em></span>`;
            }
        });

        return players;
    }

    update(object)
    {
        this.container.innerHTML = '';

        this.container.appendChild(this.getUptime(object.uptime));
        this.container.appendChild(this.getTop5(object.top5));
        this.container.appendChild(this.getPlayers(object.players));
    }
}