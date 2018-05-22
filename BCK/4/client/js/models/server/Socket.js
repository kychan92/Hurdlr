export class Socket
{
    constructor(handler)
    {
        this.socket  = io('http://localhost:8080');

        this.handler = handler;
        this.socket.on('update', data => this.handler.onUpdate(data));
        this.socket.on('tile',   data => this.handler.onNewTile(data));
    }

    join(user, callback)
    {
        this.socket.on('handshake', data => {
            this.handler.onHandshake(data);

            callback();
        });

        this.socket.emit('join', {
            name : this.handler.identifier,
            user : {
                x       : user.x,
                y       : user.y,
                jumping : user.jumping,
                score   : user.score
            }
        });
    }

    update(user)
    {
        this.socket.emit('update', {
            x       : user.x,
            y       : user.y,
            jumping : user.jumping,
            score   : user.score
        });
    }
}