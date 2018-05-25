export class Socket
{
    constructor(handler)
    {
        this.handler = handler;

        this.io = io((window.location.href.indexOf('localhost') !== -1) ? 'http://localhost:8080' : 'http://hurdlr-hurdlr.a3c1.starter-us-west-1.openshiftapps.com');
        this.io.on('update',  data => this.handler.onUpdate(this.io, data));
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
                this.handler.onHandshake(this.io, data);
                successCallback();
            }
            else
            {
                failedCallback();
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