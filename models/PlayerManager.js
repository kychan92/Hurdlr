import { ScoreHandler } from './ScoreHandler';
import { User } from './User';
import { TickHandler } from './TickHandler';

export class PlayerManager
{
    constructor(floor)
    {
        this.players      = [];
        this.floor        = floor;
        this.scoreHandler = new ScoreHandler();
        this.hasChanged   = false;
    }

    onTick()
    {
        this.hasChanged = false;
        this.players.forEach((x, i) => {
            x.tick(this.floor);
            x.score++;

            x.applyGravity(this.floor);
            x.updateAngle(this.floor);

            if (x.position.x > 800)
            {
                let offset = x.position.x - 800;

                this.players.forEach(y => y.position.x -= offset);
                this.floor.setOffset(offset);

                x.score += this.players.length - 1;
            }

            if (x.isOutOfBounds())
            {
                x.reset();
            }
        });

        this.hasChanged = true;
    }

    get(socketId)
    {
        return this.players.find(x => x.id == socketId);
    }

    remove(socketId)
    {
        let index = this.players.findIndex(x => x.id == socketId);
        if (index !== -1)
        {
            this.players.splice(index, 1);
        }

        return true;
    }

    createNewPlayer(socketId, name)
    {
        let player = this.players.find(x => x.name == name);
        if (player) return false;

        this.players.push(new User(socketId, name));

        return true;
    }
}