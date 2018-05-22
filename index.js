const UPTIME = require('./utils/Uptime');

const ServerLogic    = require('./controllers/ServerLogic');
const FloorGenerator = require('./models/FloorGenerator');
const SocketLogic    = require('./controllers/SocketLogic');
const ScoreHandler   = require('./models/ScoreHandler');

let serverLogic    = new ServerLogic();
let floorGenerator = new FloorGenerator(2, 15);
let socketLogic    = new SocketLogic(serverLogic.server);
let scoreHandler   = new ScoreHandler(socketLogic.players);

socketLogic.onHandshake = (socket) => {
    socket.emit('handshake', {
        floors : floorGenerator.floors
    });
};

socketLogic.onUpdate = () => {
    scoreHandler.update();

    socketLogic.io.emit('update', {
        uptime    : UPTIME,
        top5      : scoreHandler.getTop5(),
        lastFloor : floorGenerator.last,
        players   : socketLogic.players.map(x => {
            return {
                name : x.name,
                user : x.user
            };
        })
    });
}

socketLogic.onTile = (name, offset) => {
    socketLogic.io.emit('tile', {
        caller : name,
        offset : offset,
        tile   : floorGenerator.next()
    });
}

serverLogic.server.listen(8080);