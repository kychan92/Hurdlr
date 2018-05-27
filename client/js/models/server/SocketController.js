import { InfoDisplay } from "./InfoDisplay";

export class SocketController
{
    constructor(canvasHelper, userRenderer, environment, nameHelper, pingDisplay)
    {
        this.canvasHelper = canvasHelper;
        this.userRenderer = userRenderer;
        this.environment  = environment;
        this.nameHelper   = nameHelper;
        this.pingDisplay  = pingDisplay;
        this.infoDisplay  = new InfoDisplay();
    }

    onScore(socket, data)
    {
        this.infoDisplay.top5 = data.top5;
        this.infoDisplay.draw();
    }

    onFloor(socket, data)
    {
        this.environment.update(data);
    }

    onSyncTick()
    {
        this.pingDisplay.update();
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
        this.nameHelper.save(data.name);
        this.infoDisplay.name = data.name;
        this.infoDisplay.draw();
    }
}