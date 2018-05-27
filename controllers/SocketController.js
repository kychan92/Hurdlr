export class SocketController
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
            user.updateMoveState(data);
            return true;
        }

        return false;
    }

    onMessage(socket, data)
    {
        if (data.message.toLowerCase().startsWith('/name'))
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

    onUpdateRequest(io, force)
    {
        this.playerManager.scoreHandler.update(this.playerManager.players);

        let updates = {};

        if (this.playerManager.scoreHandler.updated || force)
        {
            updates.top5 = this.playerManager.scoreHandler.getTop5();
        }

        if (this.floor.updated || force)
        {
            updates.locations  = this.floor.locations;
            updates.offset     = this.floor.offset;
            this.floor.updated = false;
        }

        if (this.playerManager.updated || force)
        {
            updates.players = this.playerManager.players;
        }

        io.emit('update', updates);
    }
}