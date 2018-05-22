import { Tween } from "./../models/utils/Tween";

export class UserController
{
    constructor(user, socket)
    {
        this.user   = user;
        this.socket = socket;

        this.keys   = [];
        this.tweens = [
            new Tween(() => this.user.onLeft(),      15, true),
            new Tween(() => this.user.onRight(),     15, true),
            new Tween(() => this.user.onJump(),      25, false)
        ];

        document.body.addEventListener('keydown', (event) => this.onKey(true,  event));
        document.body.addEventListener('keyup',   (event) => this.onKey(false, event));

        this.addKey(37, () => this.tweens[0].trigger());
        this.addKey(39, () => this.tweens[1].trigger());
        this.addKey(38, () => {
            if (this.user.jumping) return;

            this.tweens[2].trigger();
            this.user.jumping = true;
        });

        this.user.onJumpEnd = () => this.onJumpEnd();
    }

    onKey(down, event)
    {
        this.keys.forEach(x => {
            if (x.key == event.keyCode)
            {
                x.activated = down;
            }
        });
    }

    onJumpEnd()
    {
        this.socket.update(this.user);
    }

    addKey(key, event)
    {
        this.keys.push({
            key,
            activated : false,
            event
        });
    }

    tick()
    {
        this.user.x-=1;

        this.keys.forEach(x => {
            if (x.activated)
            {
                x.event();
                this.socket.update(this.user);
            }
        });

        this.tweens.forEach(x => x.tick());
    }
}