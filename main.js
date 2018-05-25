import './utils/Uptime';

import { Server        } from './controllers/Server';
import { Floor         } from './models/Floor';
import { SocketManager } from './models/SocketManager';
import { ScoreHandler  } from './models/ScoreHandler';
import { SocketHandler } from './controllers/SocketHandler';
import { PlayerManager } from './models/PlayerManager';
import { TickHandler   } from './models/TickHandler';

let server = new Server();
let floor  = new Floor(2, 15);

let playerManager = new PlayerManager(floor);
let socketHandler = new SocketHandler(playerManager, floor);
let socketManager = new SocketManager(server, socketHandler);

let tickHandler   = new TickHandler(() => {
    playerManager.onTick();

    if (playerManager.hasChanged)
    {
        socketHandler.onUpdateRequest(socketManager.io);
    }
});

server.listen(8000);