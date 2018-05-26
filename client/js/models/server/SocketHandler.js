import { InfoDisplay } from "./InfoDisplay";
import { PingDisplay } from "../utils/PingDisplay";

export class SocketHandler
{
    constructor(canvasHelper, userRenderer, floorGenerator, nameGenerator, background, pingDisplay)
    {
        this.canvasHelper   = canvasHelper;
        this.userRenderer   = userRenderer;
        this.floorGenerator = floorGenerator;
        this.nameGenerator  = nameGenerator;
        this.background     = background;
        this.pingDisplay    = pingDisplay;
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

        this.background.tileGenerator.next();
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
        this.nameGenerator.save(data.name);
        this.infoDisplay.name = data.name;
        this.infoDisplay.draw();
    }
}