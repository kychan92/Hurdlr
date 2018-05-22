import { TileCalculator } from "./utils/TileCalculator";

const USER_WIDTH  = 30;
const USER_HEIGHT = 30;
const START_X     = window.innerWidth / 3;
const START_Y     = 200;

export class User
{
    constructor(floorGenerator)
    {
        this.floorGenerator = floorGenerator;
        this.tileCalculator = new TileCalculator(this.floorGenerator);
        this.jumping        = false;

        this.x     = START_X;
        this.y     = START_Y;
        this.score = 0;
    }

    onLeft()
    {
        if (this.jumping)
        {
            this.x -= 2;
            return;
        }

        let slope = this.tileCalculator.getSlopeByWidth(this.x);

        this.x -= 3;
        if (slope > 0) this.x-=2;
        if (slope < 0) this.x+=1;
    }

    onRight()
    {
        if (this.jumping)
        {
            this.x += 2;
            return;
        }

        let slope = this.tileCalculator.getSlopeByWidth(this.x);

        this.x += 3;
        if (slope < 0) this.x+=2;
        if (slope > 0) this.x-=1;
    }

    onJump()
    {
        this.y -= 15;
    }

    onGravity()
    {
        let minHeight = this.tileCalculator.getHeightByWidth(this.x);
        if (this.y - USER_HEIGHT < minHeight)
        {
            this.y += 8;
        }

        if (this.y >= minHeight)
        {
            if (this.onJumpEnd) this.onJumpEnd();

            this.jumping = false;
            this.y       = minHeight;
        }

        if (minHeight - this.y > 150)
        {
            this.y = minHeight - 150;
        }
    }

    renderScore(canvasHelper)
    {
        canvasHelper.context.fillStyle = canvasHelper.COLOR.TEXT;
        canvasHelper.context.font      = '20px Courier';
        canvasHelper.context.fillText(this.score, this.x - ((this.score.toString().length / 2) * 14), this.y - (USER_HEIGHT + 20));
    }

    checkOutOfBounds(canvasHelper)
    {
        if (this.x > window.innerWidth) this.x = window.innerWidth;
        if (this.x < -USER_WIDTH)
        {
            this.x     = START_X;
            this.y     = START_Y;
            this.score = 0;
        }
    }

    setController(controller)
    {
        this.controller = controller;
    }

    render(canvasHelper)
    {
        this.checkOutOfBounds(canvasHelper);
        this.onGravity();

        if (this.controller)
        {
            this.controller.tick();
        }

        this.score++;
        canvasHelper.context.fillStyle = canvasHelper.COLOR.USER;

        let dx    = this.x - USER_WIDTH/2;
        let slope = this.tileCalculator.getSlopeByWidth(this.x);
        let angle = (slope * -this.floorGenerator.ANGLE) || 0;

        if (!this.jumping)
        {
            canvasHelper.context.save();
            canvasHelper.context.translate(this.x, this.y);
            canvasHelper.context.rotate(angle);
            canvasHelper.context.translate(-this.x, -this.y);
            canvasHelper.context.fillRect(dx, this.y, USER_WIDTH, -USER_HEIGHT);
            this.renderScore(canvasHelper);
            canvasHelper.context.restore();
        }
        else
        {
            canvasHelper.context.fillRect(dx, this.y, USER_WIDTH, -USER_HEIGHT);
            this.renderScore(canvasHelper);
        }
    }
}