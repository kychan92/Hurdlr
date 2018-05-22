module.exports = function(app, updateCallback)
{
    this.io          = require('socket.io')(app);
    this.players     = [];
    this.onUpdate    = () => {};
    this.onHandshake = () => {};

    this.initialize = function()
    {
        this.io.on('connection', socket => this.onConnect(socket));
    }

    this.onConnect = function(socket)
    {
        let identifier = (Date.now() + Math.random() * 1000000).toString(16);
        this.players.push({
            identifier : identifier,
            socket     : socket
        });

        socket.on('join', (data) => {
            let player = this.players.find(x => x.identifier == identifier);
            if (player)
            {
                player.name = data.name;
                player.user = data.user;

                this.onHandshake(socket);
            }

            this.onUpdate();
        });
    
        socket.on('update', (user) => {
            let player = this.players.find(x => x.identifier == identifier);
            if (player)
            {
                player.user = user;

                this.onUpdate();
            }
        })

        socket.on('disconnect', () => {
            this.players.splice(this.players.findIndex(x => x.identifier == identifier), 1);

            this.onUpdate();
        });

        this.onUpdate();
    }

    this.initialize();
}