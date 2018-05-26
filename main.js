import './utils/Uptime';

import { Server           } from './controllers/Server';
import { Floor            } from './models/Floor';
import { SocketManager    } from './models/SocketManager';
import { ScoreHandler     } from './models/ScoreHandler';
import { SocketController } from './controllers/SocketController';
import { PlayerManager    } from './models/PlayerManager';
import { TickHandler      } from './models/TickHandler';

let server = new Server();
let floor  = new Floor(2, 15);

let playerManager    = new PlayerManager(floor);
let socketController = new SocketController(playerManager, floor);
let socketManager    = new SocketManager(server, socketController);

let tickHandler = new TickHandler(() => {
    playerManager.onTick();

    socketController.onUpdateRequest(socketManager.io);
});

server.listen(process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
              process.env.IP   || process.env.OPENSHIFT_NODEJS_IP   || '0.0.0.0');