export class SocketManager
{
    constructor(app, socketController)
    {
        this.io               = require('socket.io')(app);
        this.socketController = socketController;

        this.io.on('connection', socket => this.onConnect(socket));
    }

    onConnect(socket)
    {
        socket.on('join', (data) => {
            if (this.socketController.onJoin(socket, data))
            {
                socket.emit('handshake', { result : true, name : data.name, uptime : process.env.UPTIME });
                this.socketController.onUpdateRequest(this.io, true);
                return;
            }

            socket.emit('handshake', { result : false });
        });

        socket.on('action', (data) => {
            if (this.socketController.onAction(socket, data))
            {
                this.socketController.onUpdateRequest(this.io);
            }
        });

        socket.on('disconnect', () => {
            if (this.socketController.onDisconnect(socket))
            {
                this.socketController.onUpdateRequest(this.io);
            }
        });

        socket.on('message', (data) => {
            if (this.socketController.onMessage(socket, data))
            {
                this.io.emit('message', data);
                return;
            }

            this.socketController.onUpdateRequest(this.io, true);
        })
    }
}