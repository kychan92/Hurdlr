export class Socket
{
    constructor(handler)
    {
        this.handler = handler;

        this.io = io((window.location.href.indexOf('localhost') !== -1) ? 'http://localhost:8080' : 'http://hurdlr-hurdlr.a3c1.starter-us-west-1.openshiftapps.com');
        this.io.on('update', data => this.onUpdate(data));
    }

    onUpdate(data)
    {
        this.handler.onSyncTick();

        if (data.top5)
        {
            this.handler.onScore(this.io, data);
        }

        if (data.locations)
        {
            this.handler.onFloor(this.io, data);
        }

        if (data.players)
        {
            data.players.forEach(x => {
                if (x.id == this.io.id)
                {
                    x.owned = true;
                }
            });

            this.handler.onPlayers(this.io, data);
        }
    }

    setController(controller)
    {
        this.controller        = controller;
        this.controller.socket = this;
    }

    join(name, successCallback, failedCallback)
    {
        this.io.on('handshake', (data) => {
            if (data.result)
            {
                this.uptime = data.uptime;
                this.handler.onHandshake(this.io, data);
                successCallback(data);
            }
            else
            {
                failedCallback(data);
            }
        });

        this.io.emit('join', {
            name : name
        });
    }

    sendAction(action)
    {
        this.io.emit('action', action);
    }
}