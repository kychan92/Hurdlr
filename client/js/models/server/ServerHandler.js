import { ServerDisplay } from "./ServerDisplay";

export class ServerHandler
{
    constructor(canvasHelper, userRenderer, floorGenerator, nameGenerator)
    {
        this.canvasHelper   = canvasHelper;
        this.userRenderer   = userRenderer;
        this.floorGenerator = floorGenerator;
        this.nameGenerator  = nameGenerator;
        this.serverDisplay  = new ServerDisplay();
    }

    onUpdate(socket, data)
    {
        this.floorGenerator.tiles  = data.floors;
        this.floorGenerator.offset = data.floorOffset;
        this.serverDisplay.update(data, this.nameGenerator.name);
        this.userRenderer.update(data.players);
    }

    onHandshake(socket, data)
    {
        this.nameGenerator.save(data.name);
    }
}