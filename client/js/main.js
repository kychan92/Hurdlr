import { NameHelper }       from "./models/utils/NameHelper";
import { FullScreenHelper } from "./models/utils/FullScreenHelper";
import { Environment }      from "./models/background/Environment";
import { UserRenderer }     from "./models/UserRenderer";
import { CanvasHelper }     from "./models/CanvasHelper";
import { Controller }       from "./controllers/Controller";
import { Music }            from "./models/effects/Music";

import { Socket }           from "./models/server/Socket";
import { SocketController } from "./models/server/SocketController";
import { MessageBox }       from "./models/server/Messagebox";
import { PingDisplay }      from "./models/server/PingDisplay";

new Music();
new FullScreenHelper();

let nameHelper    = new NameHelper();
let canvasHelper  = new CanvasHelper();
let pingDisplay   = new PingDisplay();
let controller    = new Controller();

let environment   = new Environment();
let userRenderer  = new UserRenderer();
let socket        = new Socket(new SocketController(canvasHelper,
                                                    userRenderer,
                                                    environment,
                                                    nameHelper,
                                                    pingDisplay));

socket.setController(controller);
canvasHelper.add(environment);
canvasHelper.add(userRenderer);
canvasHelper.add(pingDisplay);

let name = nameHelper.get();
let connect = () => {
    socket.join(name, () => {
        new MessageBox(nameHelper, socket);

        canvasHelper.render();
    }, () => {
        console.error(`Failed to connect with ${name}`);

        nameHelper.generateName();
        name = nameHelper.name;

        connect();
    });
}

connect();