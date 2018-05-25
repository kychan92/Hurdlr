export class SocketManager
{
    constructor(app, socketHandler)
    {
        this.io            = require('socket.io')(app);
        this.socketHandler = socketHandler;
        this.connections   = [];
    
        this.io.on('connection', socket => this.onConnect(socket));
    }

    onConnect(socket)
    {
        this.connections.push(socket);

        socket.on('join', (data) => {
            if (this.socketHandler.onJoin(socket, data))
            {
                socket.emit('handshake', { result : true, name : data.name });
                this.socketHandler.onUpdateRequest(this.io);
                return;
            }

            socket.emit('handshake', { result : false });
        });

        socket.on('action', (data) => {
            if (this.socketHandler.onAction(socket, data))
            {
                this.socketHandler.onUpdateRequest(this.io);
            }
        });

        socket.on('disconnect', () => {
            if (this.socketHandler.onDisconnect(socket))
            {
                let index = this.connections.indexOf(socket);
                if (index !== -1)
                {
                    this.connections.splice(index, 1);
                }

                this.socketHandler.onUpdateRequest(this.io);
            }
        });

        socket.on('message', (data) => {
            if (this.socketHandler.onMessage(socket, data))
            {
                this.io.emit('message', data);
                return;
            }

            this.socketHandler.onUpdateRequest(this.io);
        })
    }
}