import { ServerDisplay } from "./ServerDisplay";

export class ServerHandler
{
    constructor(canvasHelper, userRenderer, floorGenerator, nameGenerator, background)
    {
        this.canvasHelper   = canvasHelper;
        this.userRenderer   = userRenderer;
        this.floorGenerator = floorGenerator;
        this.nameGenerator  = nameGenerator;
        this.background     = background;
        this.serverDisplay  = new ServerDisplay();
    }

    onUpdate(socket, data)
    {
        this.floorGenerator.tiles  = data.floors;
        this.floorGenerator.offset = data.floorOffset;
        this.serverDisplay.update(data, this.nameGenerator.name);
        this.userRenderer.update(data.players);

        if (data.floorUpdated)
        {
            if (Math.random() > .8)
            {
                this.background.tileGenerator.next();
            }
        }
    }

    onHandshake(socket, data)
    {
        this.nameGenerator.save(data.name);
    }
}