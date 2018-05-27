export class Controller
{
    constructor()
    {
        this.keys = [];

        document.body.addEventListener('keydown', (event) => this.onKey(true,  event));
        document.body.addEventListener('keyup',   (event) => this.onKey(false, event));

        this.addKey(32);
        this.addKey(37);
        this.addKey(38);
        this.addKey(39);
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