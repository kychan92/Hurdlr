import { InfoDisplay } from "./InfoDisplay";

export class SocketHandler
{
    constructor(canvasHelper, userRenderer, floorGenerator, nameGenerator, background)
    {
        this.canvasHelper   = canvasHelper;
        this.userRenderer   = userRenderer;
        this.floorGenerator = floorGenerator;
        this.nameGenerator  = nameGenerator;
        this.background     = background;
        this.infoDisplay    = new InfoDisplay();
    }

    onScore(socket, data)
    {
        this.infoDisplay.top5 = data.top5;
        this.infoDisplay.draw();
    }

    onFloor(socket, data)
    {
        this.floorGenerator.tiles  = data.floors;
        this.floorGenerator.offset = data.offset;
    }

    onSyncTick()
    {
        this.userRenderer.players.forEach(x => {
            x.score++;

            let top5Player = this.infoDisplay.top5.find(y => y.id == x.id);
            if (top5Player && top5Player.score < x.score)
            {
                top5Player.score = x.score;
            }
        });
        this.infoDisplay.draw();
    }

    onPlayers(socket, data)
    {
        this.userRenderer.update(data.players);

        this.infoDisplay.players = data.players;
        this.infoDisplay.draw();
    }

    onHandshake(socket, data)
    {
        this.nameGenerator.save(data.name);
        this.infoDisplay.name = data.name;
        this.infoDisplay.draw();
    }
}