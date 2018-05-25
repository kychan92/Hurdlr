export class Socket
{
    constructor(handler)
    {
        this.handler = handler;

        this.io = io('http://localhost:8000');
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