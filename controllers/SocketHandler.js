export class SocketHandler
{
    constructor(playerManager, floor)
    {
        this.playerManager = playerManager;
        this.floor         = floor;
    }

    onJoin(socket, data)
    {
        if (this.playerManager.createNewPlayer(socket.id, data.name))
        {
            return true;
        }

        return false;
    }

    onAction(socket, data)
    {
        let user = this.playerManager.get(socket.id);
        if (user)
        {
            user.move(data);
            return true;
        }

        return false;
    }

    onMessage(socket, data)
    {
        if (data.message.startsWith('/name'))
        {
            let parts = data.message.split(' ');
            let user  = this.playerManager.get(socket.id);
            if (user)
            {
                user.name = parts[1];

                socket.emit('handshake', { result : true, name : user.name });
            }

            return false;
        }

        return true;
    }

    onDisconnect(socket)
    {
        this.playerManager.remove(socket.id);
        return true;
    }

    onUpdateRequest(io)
    {
        this.playerManager.scoreHandler.update(this.playerManager.players);

        io.emit('update', {
            uptime       : process.env.UPTIME,
            top5         : this.playerManager.scoreHandler.getTop5(),
            floors       : this.floor.locations,
            floorOffset  : this.floor.offset,
            floorUpdated : this.floor.updated,
            players      : this.playerManager.players
        });

        this.floor.updated = false;
    }
}