export class Socket
{
    constructor(handler)
    {
        this.io  = io('http://localhost:8080');

        this.handler = handler;
        this.io.on('update', data => this.handler.onUpdate(data));
        this.io.on('tile',   data => this.handler.onNewTile(data));
    }

    join(user, callback)
    {
        this.io.on('handshake', data => {
            this.handler.onHandshake(data);

            callback();
        });

        this.io.emit('join', {
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
        this.io.emit('update', {
            x       : user.x,
            y       : user.y,
            jumping : user.jumping,
            score   : user.score
        });
    }
}