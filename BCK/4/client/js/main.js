import { CanvasHelper } from "./models/CanvasHelper";
import { Background } from "./models/ambient/Background";
import { Floor } from "./models/Floor";
import { User } from "./models/User";
import { UserController } from "./controllers/UserController";
import { Music } from "./models/ambient/Music";
import { Socket } from "./models/server/Socket";
import { ServerHandler } from "./models/server/ServerHandler";

new Music();

let identifier = 'player' + Math.floor(Math.random() * 100000).toString(16);

let canvasHelper = new CanvasHelper();
let floor        = new Floor();
let user         = new User(floor.floorGenerator);
let socket       = new Socket(new ServerHandler(canvasHelper, identifier, floor.floorGenerator));
user.setController(new UserController(user, socket));

canvasHelper.add(new Background());
canvasHelper.add(floor);
canvasHelper.add(user);

socket.join(user, () => {
    canvasHelper.render();
});