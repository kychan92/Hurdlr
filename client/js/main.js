import { CanvasHelper } from "./models/CanvasHelper";
import { Background } from "./models/ambient/Background";
import { Floor } from "./models/Floor";
import { Controller } from "./controllers/Controller";
import { Music } from "./models/ambient/Music";
import { Socket } from "./models/server/Socket";
import { ServerHandler } from "./models/server/ServerHandler";
import { UserRenderer } from "./models/utils/UserRenderer";
import { MessageBox } from "./models/server/Messagebox";
import { NameGenerator } from "./models/NameGenerator";
import { FullScreen } from "./models/ambient/FullScreen";

new Music();
new FullScreen();

let nameGenerator = new NameGenerator();
let canvasHelper  = new CanvasHelper();
let background    = new Background();
let floor         = new Floor();
let userRenderer  = new UserRenderer();
let socket        = new Socket(new ServerHandler(canvasHelper, userRenderer, floor.floorGenerator, nameGenerator, background));
socket.setController(new Controller());

canvasHelper.add(background);
canvasHelper.add(floor);
canvasHelper.add(userRenderer);

window.addEventListener('resize', () => {
    canvasHelper.canvas.width  = window.innerWidth;
    canvasHelper.canvas.height = window.innerHeight;
});

let name = nameGenerator.get();
let connect = () => {
    socket.join(name, () => {
        new MessageBox(nameGenerator, socket.io);
    
        canvasHelper.render();
    }, () => {
        console.error(`Failed to connect with ${name}`);

        nameGenerator.generateName();
        name = nameGenerator.name;
        connect();
    });
}
connect();