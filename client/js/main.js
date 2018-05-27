import { CanvasHelper }  from "./models/CanvasHelper";
import { Background }    from "./models/ambient/Background";
import { Floor }         from "./models/Floor";
import { Controller }    from "./controllers/Controller";
import { Music }         from "./models/ambient/Music";
import { Socket }        from "./models/server/Socket";
import { SocketHandler } from "./models/server/SocketHandler";
import { UserRenderer }  from "./models/utils/UserRenderer";
import { MessageBox }    from "./models/server/Messagebox";
import { NameGenerator } from "./models/NameGenerator";
import { FullScreen }    from "./models/ambient/FullScreen";
import { PingDisplay }   from "./models/utils/PingDisplay";

new Music();
new FullScreen();

let nameGenerator = new NameGenerator();
let canvasHelper  = new CanvasHelper();
let pingDisplay   = new PingDisplay();

let background    = new Background();
let floor         = new Floor();
let userRenderer  = new UserRenderer();
let socket        = new Socket(new SocketHandler(canvasHelper,
                                                 userRenderer,
                                                 floor.floorGenerator,
                                                 nameGenerator,
                                                 background,
                                                 pingDisplay));

socket.setController(new Controller());
canvasHelper.add(background);
canvasHelper.add(floor);
canvasHelper.add(userRenderer);
canvasHelper.add(pingDisplay);

let name = nameGenerator.get();
let connect = () => {
    socket.join(name, () => {
        new MessageBox(nameGenerator, socket);

        canvasHelper.render();
    }, () => {
        console.error(`Failed to connect with ${name}`);

        nameGenerator.generateName();
        name = nameGenerator.name;

        connect();
    });
}

connect();