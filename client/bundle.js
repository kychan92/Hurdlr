/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TileRenderer
{
    constructor()
    {
    }

    render(canvasHelper, definition)
    {
        canvasHelper.context.beginPath();
        canvasHelper.context.moveTo(0, definition.locations[0] * definition.blockHeight);

        definition.locations.forEach((height, i) => {
            let x = i * definition.blockWidth - definition.offset;
            let y = window.innerHeight - (height * definition.blockHeight);
            canvasHelper.context.lineTo(x, y);
        });

        canvasHelper.context.lineTo(window.innerWidth, window.innerHeight);
        canvasHelper.context.lineTo(0, window.innerHeight);
        canvasHelper.context.fill();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileRenderer;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TickHelper
{
    constructor(maxTicks, callback)
    {
        this.ticks    = 0;
        this.maxTicks = maxTicks;
        this.callback = callback;
    }

    tick()
    {
        this.ticks++;

        if (this.ticks > this.maxTicks)
        {
            this.ticks = 0;
            this.callback();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TickHelper;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_utils_NameHelper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_utils_FullScreenHelper__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_background_Environment__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_UserRenderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_CanvasHelper__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__controllers_Controller__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_effects_Music__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_server_Socket__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_server_SocketController__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_server_Messagebox__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_server_PingDisplay__ = __webpack_require__(20);













new __WEBPACK_IMPORTED_MODULE_6__models_effects_Music__["a" /* Music */]();
new __WEBPACK_IMPORTED_MODULE_1__models_utils_FullScreenHelper__["a" /* FullScreenHelper */]();

let nameHelper    = new __WEBPACK_IMPORTED_MODULE_0__models_utils_NameHelper__["a" /* NameHelper */]();
let canvasHelper  = new __WEBPACK_IMPORTED_MODULE_4__models_CanvasHelper__["a" /* CanvasHelper */]();
let pingDisplay   = new __WEBPACK_IMPORTED_MODULE_10__models_server_PingDisplay__["a" /* PingDisplay */]();
let controller    = new __WEBPACK_IMPORTED_MODULE_5__controllers_Controller__["a" /* Controller */]();

let environment   = new __WEBPACK_IMPORTED_MODULE_2__models_background_Environment__["a" /* Environment */]();
let userRenderer  = new __WEBPACK_IMPORTED_MODULE_3__models_UserRenderer__["a" /* UserRenderer */]();
let socket        = new __WEBPACK_IMPORTED_MODULE_7__models_server_Socket__["a" /* Socket */](new __WEBPACK_IMPORTED_MODULE_8__models_server_SocketController__["a" /* SocketController */](canvasHelper,
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
        new __WEBPACK_IMPORTED_MODULE_9__models_server_Messagebox__["a" /* MessageBox */](nameHelper, socket);

        canvasHelper.render();
    }, () => {
        console.error(`Failed to connect with ${name}`);

        nameHelper.generateName();
        name = nameHelper.name;

        connect();
    });
}

connect();

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class NameHelper
{
    constructor()
    {
        this.generateName();
    }

    get()
    {
        if (localStorage)
        {
            let name = localStorage.getItem('name');
            if (name)
            {
                this.name = name;
                return name;
            }

            this.save(this.name);

            return this.name;
        }

        return this.name;
    }

    save(name)
    {
        if (localStorage)
        {
            localStorage.setItem('name', name);
        }

        this.name = name;
    }

    generateName()
    {
        this.name = 'player' + Math.floor(Math.random() * 100000).toString(16);

        return name;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NameHelper;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FullScreenHelper
{
    constructor()
    {
        document.body.addEventListener('click', () => this.request());
    }

    request()
    {
        // Supports most browsers and their versions.
        var requestMethod = document.body.requestFullScreen       ||
                            document.body.webkitRequestFullScreen ||
                            document.body.mozRequestFullScreen    ||
                            document.body.msRequestFullScreen;
        if (requestMethod)
        {
            requestMethod.call(document.body);
        }
        else if (typeof window.ActiveXObject !== "undefined")
        {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null)
            {
                wscript.SendKeys("{F11}");
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FullScreenHelper;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ambient_Terrain__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ambient_AmbientStars__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FloorDefinition__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TileRenderer__ = __webpack_require__(0);





class Environment
{
    constructor()
    {
        this.floor        = new __WEBPACK_IMPORTED_MODULE_2__FloorDefinition__["a" /* FloorDefinition */]();
        this.terrain      = new __WEBPACK_IMPORTED_MODULE_0__ambient_Terrain__["a" /* Terrain */]();
        this.ambientStars = new __WEBPACK_IMPORTED_MODULE_1__ambient_AmbientStars__["a" /* AmbientStars */]();
        this.tileRenderer = new __WEBPACK_IMPORTED_MODULE_3__TileRenderer__["a" /* TileRenderer */]();
    }

    update(data)
    {
        if (this.floor.offset != data.offset || this.floor.locations != data.locations)
        {
            this.floor.locations = data.locations;
            this.floor.offset    = data.offset;

            this.terrain.update();
        }
    }

    render(canvasHelper)
    {
        this.ambientStars.render(canvasHelper);

        this.terrain.render(canvasHelper);

        canvasHelper.context.fillStyle = canvasHelper.color.FLOOR;
        this.tileRenderer.render(canvasHelper, this.floor);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Environment;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TileGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TileRenderer__ = __webpack_require__(0);



class Terrain
{
    constructor()
    {
        this.offset = 0;
        this.hills  = [
            new __WEBPACK_IMPORTED_MODULE_0__TileGenerator__["a" /* TileGenerator */](255, 100, 50, 6, 9, 50),
            new __WEBPACK_IMPORTED_MODULE_0__TileGenerator__["a" /* TileGenerator */](205, 90, 50, 5, 8, 50),
            new __WEBPACK_IMPORTED_MODULE_0__TileGenerator__["a" /* TileGenerator */](135, 80, 50, 4, 8, 50),

            new __WEBPACK_IMPORTED_MODULE_0__TileGenerator__["a" /* TileGenerator */](235, 100, 50, 4, 7, 50),
            new __WEBPACK_IMPORTED_MODULE_0__TileGenerator__["a" /* TileGenerator */](175, 105, 50, 3, 6, 50),
            new __WEBPACK_IMPORTED_MODULE_0__TileGenerator__["a" /* TileGenerator */](105, 90, 50, 3, 6, 50),

            new __WEBPACK_IMPORTED_MODULE_0__TileGenerator__["a" /* TileGenerator */](215, 100, 50, 3, 6, 50),
            new __WEBPACK_IMPORTED_MODULE_0__TileGenerator__["a" /* TileGenerator */](165, 90, 50, 3, 5, 50),
            new __WEBPACK_IMPORTED_MODULE_0__TileGenerator__["a" /* TileGenerator */](95, 105, 50, 3, 5, 50),

            new __WEBPACK_IMPORTED_MODULE_0__TileGenerator__["a" /* TileGenerator */](255, 100, 50, 3, 5, 50),
            new __WEBPACK_IMPORTED_MODULE_0__TileGenerator__["a" /* TileGenerator */](205, 120, 50, 3, 4, 50),

            new __WEBPACK_IMPORTED_MODULE_0__TileGenerator__["a" /* TileGenerator */](245, 80, 50, 3, 5, 50)
        ];

        this.renderer = new __WEBPACK_IMPORTED_MODULE_1__TileRenderer__["a" /* TileRenderer */]();
    }

    update()
    {
        this.hills.forEach(x => {
            x.next();
        });
    }

    render(canvasHelper)
    {
        canvasHelper.context.filter = 'blur(2px)';
        canvasHelper.context.fillStyle = canvasHelper.color.HILLS_FAR;
        this.renderer.render(canvasHelper, this.hills[0]);
        this.renderer.render(canvasHelper, this.hills[1]);
        this.renderer.render(canvasHelper, this.hills[2]);

        canvasHelper.context.fillStyle = canvasHelper.color.HILLS_FAR_NEAR;
        this.renderer.render(canvasHelper, this.hills[3]);
        this.renderer.render(canvasHelper, this.hills[4]);
        this.renderer.render(canvasHelper, this.hills[5]);

        canvasHelper.context.fillStyle = canvasHelper.color.HILLS_NEAR;
        this.renderer.render(canvasHelper, this.hills[6]);
        this.renderer.render(canvasHelper, this.hills[7]);
        this.renderer.render(canvasHelper, this.hills[8]);

        canvasHelper.context.fillStyle = canvasHelper.color.HILLS_NEAR_CLOSE;
        this.renderer.render(canvasHelper, this.hills[9]);
        this.renderer.render(canvasHelper, this.hills[10]);

        canvasHelper.context.filter = 'blur(1px)';
        canvasHelper.context.fillStyle = canvasHelper.color.HILLS_CLOSE;
        this.renderer.render(canvasHelper, this.hills[11]);

        canvasHelper.context.filter = 'none';
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Terrain;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TileGenerator
{
    constructor(blockWidth, blockHeight, maxBlocks, minBlockHeight, maxBlockHeight)
    {
        this.blockWidth     = blockWidth;
        this.blockHeight    = blockHeight;
        this.maxBlocks      = maxBlocks;
        this.angle          = Math.atan2(blockHeight, blockWidth);
        this.minBlockHeight = minBlockHeight;
        this.maxBlockHeight = maxBlockHeight;

        this.locations = [];
        this.offset    = 0;

        this.populate();
    }

    populate()
    {
        for (let i = 0; i < this.maxBlocks; i++)
        {
            this.generate();
        }
    }

    generate()
    {
        let height = (this.locations.length > 0) ? this.locations[this.locations.length - 1] : this.minBlockHeight;
        height    += (Math.random() > .5) ? 1 : -1;

        if (height > this.maxBlockHeight) height = this.maxBlockHeight - 1;
        if (height < this.minBlockHeight) height = this.minBlockHeight + 1;

        this.locations.push(height);
    }

    next()
    {
        this.offset++;

        if (this.offset > this.blockWidth)
        {
            this.locations.shift();
            this.generate();
            this.offset-=this.blockWidth;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileGenerator;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_TickHelper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Star__ = __webpack_require__(9);



class AmbientStars
{
    constructor()
    {
        this.stars = [];

        this.starTicker = new __WEBPACK_IMPORTED_MODULE_0__utils_TickHelper__["a" /* TickHelper */](25, () => {
            this.stars.push(new __WEBPACK_IMPORTED_MODULE_1__Star__["a" /* Star */]());
        });
    }

    render(canvasHelper)
    {
        this.starTicker.tick();

        this.stars.forEach((x, i) => {
            if (x.removed)
            {
                this.stars.splice(i, 1);
                return;
            }

            x.step();
            x.render(canvasHelper);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AmbientStars;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const SPEED = 5;

class Star
{
    constructor()
    {
        this.x     = Math.random() * window.innerWidth;
        this.y     = 0;
        this.angle = Math.PI + (Math.random() * Math.PI / 2);
    }

    step()
    {
        this.x += Math.cos(this.angle) * SPEED;
        this.y -= Math.sin(this.angle) * SPEED;

        if (this.outOfBounds())
        {
            this.removed = true;
        }
    }

    render(canvasHelper)
    {
        canvasHelper.context.fillStyle = canvasHelper.color.STARS;
        canvasHelper.context.fillRect(this.x, this.y, 3, 3);
    }

    outOfBounds()
    {
        if (this.x < 0 || this.y < 0 || this.y > window.innerHeight)
        {
            return true;
        }

        return false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Star;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FloorDefinition
{
    constructor()
    {
        this.blockWidth     = 90;
        this.blockHeight    = 40;
        this.maxBlocks      = 100;
        this.minBlockHeight = 2;
        this.maxBlockHeight = 9;
        this.angle          = Math.atan2(this.blockHeight, this.blockWidth);
        this.offset         = 0;
        this.locations      = [this.minBlockHeight];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FloorDefinition;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const USER_WIDTH      = 30;
const USER_HEIGHT     = 30;
const OPPONENTS_ALPHA = 0.6;

class UserRenderer
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
/* harmony export (immutable) */ __webpack_exports__["a"] = UserRenderer;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_PaletteHelper__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_TickHelper__ = __webpack_require__(1);



const FILTER = 'brightness(90%)';

class CanvasHelper
{
    constructor()
    {
        this.items = [];

        this.canvas  = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.color = new __WEBPACK_IMPORTED_MODULE_0__utils_PaletteHelper__["a" /* PaletteHelper */]();

        document.body.appendChild(this.canvas);

        this.context.filter = FILTER;
        window.addEventListener('resize', () => {
            this.canvas.width   = window.innerWidth;
            this.canvas.height  = window.innerHeight;
            this.context.filter = FILTER;
        });
    }

    add(item)
    {
        this.items.push(item);
    }

    remove(item)
    {
        let index = this.items.indexOf(item);
        if (index !== -1) this.items[index].removed = true;
    }

    stop()
    {
        this.stopped = true;
    }

    render()
    {
        this.context.fillStyle = this.color.BACKGROUND;
        this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);

        this.items.forEach((x, i) => {
            if (x.removed)
            {
                this.items.splice(i, 1);
                return;
            }

            x.render(this);
        });

        if (this.stopped) return;
        window.requestAnimationFrame(() => this.render());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CanvasHelper;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PaletteHelper
{
    constructor()
    {
        this.BACKGROUND       = '#FDDAC6',
        this.FLOOR            = '#2C0A2D',
        this.USER             = '#FFFFFFEE',
        this.STARS            = '#FFFFFF99',
        this.TEXT             = '#FFFFFF99',
        this.HILLS_FAR        = '#F97C5DCC',
        this.HILLS_FAR_NEAR   = '#F55E43EE',
        this.HILLS_NEAR       = '#F3463FF0',
        this.HILLS_NEAR_CLOSE = '#BD1642F5',
        this.HILLS_CLOSE      = '#760135FA'
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PaletteHelper;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Controller
{
    constructor()
    {
        this.keys = [];

        document.body.addEventListener('keydown', (event) => this.onKey(true,  event));
        document.body.addEventListener('keyup',   (event) => this.onKey(false, event));

        this.addKey(32);
        this.addKey(37);
        this.addKey(38);
        this.addKey(39);
    }

    isMovingLeft()
    {
        return this.keys[1].activated;
    }

    isMovingRight()
    {
        return this.keys[3].activated;
    }

    addKey(key)
    {
        this.keys.push({
            key,
            activated : false
        });
    }

    onKey(down, event)
    {
        this.keys.forEach(x => {
            if (x.key == event.keyCode)
            {
                if (x.activated != down)
                {
                    x.activated = down;
                    this.socket.sendAction(x);
                }

                return true;
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Controller;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Music
{
    constructor()
    {
        this.audio     = document.createElement('audio');
        this.audio.src = './mp3/background.mp3';

        this.audio.setAttribute('preload',  'auto');
        this.audio.setAttribute('controls', 'none');
        this.audio.setAttribute('loop',     'none');
        this.audio.volume        = 0.03;
        this.audio.style.display = 'none';

        document.body.appendChild(this.audio);
        document.body.addEventListener('click', () => this.request());
    }

    request()
    {
        //this.audio.play();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Music;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Socket
{
    constructor(socketController)
    {
        this.socketController = socketController;

        this.io = io((window.location.href.indexOf('localhost') !== -1) ? 'http://localhost:8080' : 'http://hurdlr-hurdlr.a3c1.starter-us-west-1.openshiftapps.com');
        this.io.on('update', data => this.onUpdate(data));
    }

    onUpdate(data)
    {
        this.socketController.onSyncTick();

        if (data.top5)
        {
            this.socketController.onScore(this.io, data);
        }

        if (data.locations)
        {
            this.socketController.onFloor(this.io, data);
        }

        if (data.players)
        {
            data.players.forEach(x => {
                if (x.id == this.io.id)
                {
                    x.owned = true;
                }
            });

            this.socketController.onPlayers(this.io, data);
        }
    }

    setController(controller)
    {
        this.controller        = controller;
        this.controller.socket = this;
    }

    join(name, successCallback, failedCallback)
    {
        this.io.on('handshake', (data) => {
            if (data.result)
            {
                this.uptime = data.uptime;
                this.socketController.onHandshake(this.io, data);
                successCallback(data);
            }
            else
            {
                failedCallback(data);
            }
        });

        this.io.emit('join', {
            name : name
        });
    }

    sendAction(action)
    {
        this.io.emit('action', action);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Socket;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InfoDisplay__ = __webpack_require__(18);


class SocketController
{
    constructor(canvasHelper, userRenderer, environment, nameHelper, pingDisplay)
    {
        this.canvasHelper = canvasHelper;
        this.userRenderer = userRenderer;
        this.environment  = environment;
        this.nameHelper   = nameHelper;
        this.pingDisplay  = pingDisplay;
        this.infoDisplay  = new __WEBPACK_IMPORTED_MODULE_0__InfoDisplay__["a" /* InfoDisplay */]();
    }

    onScore(socket, data)
    {
        this.infoDisplay.top5 = data.top5;
        this.infoDisplay.draw();
    }

    onFloor(socket, data)
    {
        this.environment.update(data);
    }

    onSyncTick()
    {
        this.pingDisplay.update();
        this.userRenderer.players.forEach(x => {
            x.score++;

            let top5Player = this.infoDisplay.top5.find(y => y.id == x.id);
            if (top5Player && top5Player.score < x.score)
            {
                top5Player.score = x.score;
            }
        });
        this.infoDisplay.draw();
    }

    onPlayers(socket, data)
    {
        this.userRenderer.update(data.players);

        this.infoDisplay.players = data.players;
        this.infoDisplay.draw();
    }

    onHandshake(socket, data)
    {
        this.nameHelper.save(data.name);
        this.infoDisplay.name = data.name;
        this.infoDisplay.draw();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SocketController;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class InfoDisplay
{
    constructor()
    {
        this.container    = document.createElement('div');
        this.container.id = 'server-display';
        this.top5         = [];
        this.players      = [];
        this.name         = '';

        document.body.appendChild(this.container);
    }

    createTop5()
    {
        this.top5.sort((a, b) => a.score < b.score);
        let div = document.createElement('div');
        div.className = 'top5';

        if (this.top5.length > 0)
        {
            div.innerHTML = '<div class="title">top 5</div>';

            this.top5.forEach(x => {
                div.innerHTML += this.drawItem(x);
            });
        }

        return div;
    }

    drawItem(item)
    {
        let ownerClass = (item.name == this.name) ? 'owner' : '';

        return `<div class="item ${ownerClass}"><span class="name">${item.name}</span><span class="score">${item.score}</span></div>`;
    }

    createPlayersList()
    {
        let div = document.createElement('div');
        div.className = 'players';
        div.innerHTML += '<div class="title">Players</div>';

        this.players.forEach(x => {
            div.innerHTML += (x.name) ? this.drawItem(x) : `<span><em>pending...</em></span>`;
        });

        return div;
    }

    update(top5, players, name)
    {
        this.top5    = top5;
        this.players = players;
        this.name    = name;
    }

    draw()
    {
        this.container.innerHTML = '';

        this.container.appendChild(this.createTop5());
        this.container.appendChild(this.createPlayersList());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InfoDisplay;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MessageBox
{
    constructor(nameGenerator, socket)
    {
        this.nameGenerator = nameGenerator;
        this.name          = name;
        this.socket        = socket;
        this.container     = document.createElement('div');
        this.container.id  = 'message-container';

        this.messageBox    = document.createElement('div');
        this.messageBox.id = 'message-box';

        this.inputField = document.createElement('input');
        this.inputField.setAttribute('type', 'text');

        document.body.appendChild(this.container);
        this.container.appendChild(this.messageBox);
        this.container.appendChild(this.inputField);

        this.inputField.addEventListener('keydown', (event) => this.onKey(event));

        this.socket.io.on('message', (data) => this.addMessage(this.nameGenerator.name, data.message));

        this.addWelcomeMessage();
    }

    addMessage(name, message)
    {
        this.messageBox.innerHTML += `<div class="item"><span class="name">${name}</span>: ${message}</div>`;
        this.messageBox.scrollTo(0, this.messageBox.scrollHeight);
    }

    addWelcomeMessage()
    {
        this.messageBox.innerHTML += `<div class="item">Server running since ${this.socket.uptime}.</div>`;
        this.messageBox.innerHTML += '<div class="item-break-word">Welcome visitor! Outplay your enemies by sliding faster and beat them. Change name with /name in chat.</div>';
    }

    onKey(event)
    {
        if (event.keyCode == 13)
        {
            this.socket.io.emit('message', {
                name    : this.nameGenerator.name,
                message : this.inputField.value
            });

            this.inputField.value = '';
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MessageBox;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PingDisplay
{
    constructor()
    {
        this.x             = window.innerWidth - 325;
        this.y             = 20;
        this.lastCheckTime = null;
        this.latency       = 'TBA';

        window.addEventListener('resize', () => {
            this.x = window.innerWidth - 325;
        });
    }

    update()
    {
        let now = Date.now();
        if (this.lastCheckTime)
        {
            this.latency = Math.max(15, now - this.lastCheckTime);
        }

        this.lastCheckTime = now;
    }

    render(canvasHelper)
    {
        canvasHelper.context.font      = '15px Courier';
        canvasHelper.context.fillStyle = '#FFF';
        canvasHelper.context.fillText(this.latency, this.x, this.y);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PingDisplay;


/***/ })
/******/ ]);