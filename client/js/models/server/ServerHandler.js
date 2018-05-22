import { ServerDisplay } from "./ServerDisplay";
import { User } from "./../User";
import { Tween } from "../utils/Tween";

export class ServerHandler
{
    constructor(canvasHelper, floorGenerator, identifier, user)
    {
        this.identifier     = identifier;
        this.canvasHelper   = canvasHelper;
        this.serverDisplay  = new ServerDisplay(this.identifier);
        this.floorGenerator = floorGenerator;
        this.localPlayers   = [];
        this.user           = user;
    }

    onNewTile(data)
    {
        this.floorGenerator.tiles.push(data.tile);
    }

    onUpdate(data)
    {
        this.serverDisplay.update(data);

        data.players.forEach(player => {
            if (!player.name) return;
            if (player.name == this.identifier) return;

            let localPlayer = this.localPlayers.find(x => x.name == player.name);
            if (!localPlayer)
            {
                localPlayer = {
                    name : player.name,
                    user : new User(this.floorGenerator)
                };
                this.localPlayers.push(localPlayer);
                this.canvasHelper.add(localPlayer.user);
            }

            if (!localPlayer.user.jumping && player.user.jumping)
            {
                localPlayer.user.jumping = true;
            }

            if (localPlayer.user.jumping && !player.user.jumping)
            {
                localPlayer.user.jumping = false;
            }

            if (localPlayer.user.jumping)
            {
                localPlayer.user.y -= 6;
            }

            localPlayer.user.x       = player.user.x;
            localPlayer.user.score   = player.user.score;
        });

        this.localPlayers.forEach((player, playerIndex) => {
            if (!player.name) return;
            if (player.name == this.identifier) return;

            let index = data.players.findIndex(x => x.name == player.name);
            if (index === -1)
            {
                this.canvasHelper.remove(player.user);
                this.localPlayers.splice(playerIndex, 1);
            }
        });
    }

    onHandshake(data)
    {
        this.floorGenerator.tiles = data.floors;
    }
}