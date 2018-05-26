import { Vector } from './Vector';

const LEFT  = 37;
const UP    = 38;
const RIGHT = 39;

const HILL_SPEED = 3;
const SPEED      = 5;
const RAMP_SPEED = 12;

const MAX_SPEED     = 50;
const JUMP_SPEED    = 20;
const JUMP_TICKS    = 20;
const GRAVITY_SPEED = 12;
const TWEEN_SPEED   = 0.15;

export class User
{
    constructor(socketId, name)
    {
        this.id        = socketId;
        this.name      = name;

        this.reset();
    }

    reset()
    {
        this.position  = new Vector(100 + Math.round(Math.random() * 100), 400);
        this.velocityX = 0;
        this.score     = 0;
        this.angle     = 0;
        this.isJumping = true;
        this.jumpTick  = 0;

        this.movements = {
            left  : false,
            right : false,
            up    : false
        };
    }

    getSlopeSpeed(slope, inverse)
    {
        if (this.isJumping) return SPEED;

        if (slope > 0)
        {
            return (inverse) ? RAMP_SPEED : HILL_SPEED;
        }
        else if (slope < 0)
        {
            return (inverse) ? HILL_SPEED : RAMP_SPEED;
        }

        return SPEED;
    }

    tick(floor)
    {
        if (this.movements.left)
        {
            let slope = floor.calculator.getSlopeByOffset(this.position.x);
            this.velocityX -= this.getSlopeSpeed(slope, true);
        }

        if (this.movements.right)
        {
            let slope = floor.calculator.getSlopeByOffset(this.position.x);
            this.velocityX += this.getSlopeSpeed(slope);
        }

        if (this.movements.up && !this.isJumping)
        {
            this.isJumping = true;
            this.jumpTick  = JUMP_TICKS;
        }

        if (this.jumpTick >= 0)
        {
            this.jumpTick--;
            this.position.y += JUMP_SPEED;
        }

        let stepMove = Math.min(this.velocityX * TWEEN_SPEED, MAX_SPEED);
        this.position.x += stepMove;
        this.velocityX  -= stepMove;
    }

    updateMoveState(action)
    {
        if (action.key ==  LEFT) this.movements.left  = action.activated;
        if (action.key == RIGHT) this.movements.right = action.activated;
        if (action.key ==    UP) this.movements.up    = action.activated;
    }

    applyGravity(floor)
    {
        let height = floor.calculator.getHeightByOffset(this.position.x);
        if (this.position.y >= height && this.isJumping)
        {
            this.position.y -= GRAVITY_SPEED;
            return;
        }

        this.isJumping  = false;
        this.position.y = height;
    }

    updateAngle(floor)
    {
        if (this.isJumping) return 0;

        this.angle = floor.calculator.getSlopeByOffset(this.position.x) * floor.angle;
    }

    isOutOfBounds()
    {
        return (this.position.x + 15 < 0);
    }
}