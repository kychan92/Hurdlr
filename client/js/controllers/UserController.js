export class UserController
{
    constructor(socket)
    {
        this.keys   = [];
        this.socket = socket;

        document.body.addEventListener('keydown', (event) => this.onKey(true,  event));
        document.body.addEventListener('keyup',   (event) => this.onKey(false, event));

        this.addKey(32);
        this.addKey(37);
        this.addKey(38);
        this.addKey(39);
    }

    isMovingLeft()
    {
        return this.keys[1].activated;
    }

    isMovingRight()
    {
        return this.keys[3].activated;
    }

    addKey(key)
    {
        this.keys.push({
            key,
            activated : false
        });
    }

    onKey(down, event)
    {
        this.keys.forEach(x => {
            if (x.key == event.keyCode)
            {
                if (x.activated != down)
                {
                    x.activated = down;
                    this.socket.sendAction(x);
                }

                return true;
            }
        });
    }
}