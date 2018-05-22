const TRIGGER_DISTANCE = 600;

export class CameraController
{
    constructor(user, socket, floor)
    {
        this.user   = user;
        this.socket = socket;
        this.floor  = floor;
    }

    checkForNewTiles()
    {
        if (this.user.x > TRIGGER_DISTANCE)
        {
            let offset = this.user.x - TRIGGER_DISTANCE;

            this.user.x = TRIGGER_DISTANCE;

            this.user.offset                 += offset;
            this.floor.floorGenerator.offset += offset;

            this.socket.io.emit('tile', {
                offset : offset
            });
        }
    }

    tick()
    {
        this.checkForNewTiles();
    }
}