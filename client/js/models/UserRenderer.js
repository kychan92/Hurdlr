const USER_WIDTH      = 30;
const USER_HEIGHT     = 30;
const OPPONENTS_ALPHA = 0.6;

export class UserRenderer
{
    constructor()
    {
        this.players = [];
    }

    update(players)
    {
        this.players = players;
    }

    renderScore(canvasHelper, player)
    {
        canvasHelper.context.fillStyle = canvasHelper.color.TEXT;
        canvasHelper.context.fillText(player.score,
                                      player.position.x - ((player.score.toString().length / 2) * 14),
                                      (window.innerHeight - player.position.y) - (USER_HEIGHT + 20));
    }

    render(canvasHelper)
    {
        let alpha = canvasHelper.context.globalAlpha;
        canvasHelper.context.globalAlpha = OPPONENTS_ALPHA;
        this.players.forEach(player => {
            let dx = player.position.x - USER_WIDTH/2;
            let dy = window.innerHeight - player.position.y;

            canvasHelper.context.fillStyle = canvasHelper.color.USER;
            canvasHelper.context.font      = '20px Courier';

            if (player.owned)
            {
                canvasHelper.context.globalAlpha = alpha;
            }

            if (player.angle && !player.isJumping)
            {
                canvasHelper.context.save();
                canvasHelper.context.translate(player.position.x, dy);
                canvasHelper.context.rotate(-player.angle);
                canvasHelper.context.translate(-player.position.x, -dy);
                canvasHelper.context.fillRect(dx, dy, USER_WIDTH, -USER_HEIGHT);
                this.renderScore(canvasHelper, player);
                canvasHelper.context.restore();
            }
            else
            {
                canvasHelper.context.fillRect(dx, dy, USER_WIDTH, -USER_HEIGHT);
                this.renderScore(canvasHelper, player);
            }

            if (player.owned)
            {
                canvasHelper.context.globalAlpha = OPPONENTS_ALPHA;
            }
        });
        canvasHelper.context.globalAlpha = alpha;
    }
}