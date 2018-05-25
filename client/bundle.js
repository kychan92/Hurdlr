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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TileGenerator
{
    constructor(blockWidth, blockHeight, maxBlocks, minBlockHeight, maxBlockHeight)
    {
        this.BLOCK_WIDTH      = blockWidth;
        this.BLOCK_HEIGHT     = blockHeight;
        this.MAX_BLOCKS       = maxBlocks;
        this.ANGLE            = Math.atan2(blockHeight, blockWidth);
        this.MIN_BLOCK_HEIGHT = minBlockHeight;
        this.MAX_BLOCK_HEIGHT = maxBlockHeight;

        this.tiles  = [];
        this.offset = 0;
    }

    populate()
    {
        for (let i = 0; i < this.MAX_BLOCKS; i++)
        {
            this.generate();
        }
    }

    generate()
    {
        let height = (this.tiles.length > 0) ? this.tiles[this.tiles.length - 1] : this.MIN_BLOCK_HEIGHT;
        height    += (Math.random() > .5) ? 1 : -1;

        if (height > this.MAX_BLOCK_HEIGHT) height = this.MAX_BLOCK_HEIGHT;
        if (height < this.MIN_BLOCK_HEIGHT) height = this.MIN_BLOCK_HEIGHT;

        this.tiles.push(height);
    }

    next()
    {
        this.tiles.shift();
        this.generate();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileGenerator;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TileRenderer
{
    constructor(tileGenerator)
    {
        this.tileGenerator = tileGenerator;
    }

    render(ctx)
    {
        ctx.beginPath();
        ctx.moveTo(0, this.tileGenerator.tiles[0] * this.tileGenerator.BLOCK_HEIGHT);

        this.tileGenerator.tiles.forEach((height, i) => {
            let x = i * this.tileGenerator.BLOCK_WIDTH - this.tileGenerator.offset;
            let y = window.innerHeight - (height * this.tileGenerator.BLOCK_HEIGHT);
            ctx.lineTo(x, y);
        });

        ctx.lineTo(window.innerWidth, window.innerHeight);
        ctx.lineTo(0, window.innerHeight);
        ctx.fill();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileRenderer;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_CanvasHelper__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_ambient_Background__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Floor__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_Controller__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_ambient_Music__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_server_Socket__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_server_ServerHandler__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_utils_UserRenderer__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_server_Messagebox__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_NameGenerator__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_ambient_FullScreen__ = __webpack_require__(18);












new __WEBPACK_IMPORTED_MODULE_4__models_ambient_Music__["a" /* Music */]();
new __WEBPACK_IMPORTED_MODULE_10__models_ambient_FullScreen__["a" /* FullScreen */]();

let nameGenerator = new __WEBPACK_IMPORTED_MODULE_9__models_NameGenerator__["a" /* NameGenerator */]();
let canvasHelper  = new __WEBPACK_IMPORTED_MODULE_0__models_CanvasHelper__["a" /* CanvasHelper */]();
let background    = new __WEBPACK_IMPORTED_MODULE_1__models_ambient_Background__["a" /* Background */]();
let floor         = new __WEBPACK_IMPORTED_MODULE_2__models_Floor__["a" /* Floor */]();
let userRenderer  = new __WEBPACK_IMPORTED_MODULE_7__models_utils_UserRenderer__["a" /* UserRenderer */]();
let socket        = new __WEBPACK_IMPORTED_MODULE_5__models_server_Socket__["a" /* Socket */](new __WEBPACK_IMPORTED_MODULE_6__models_server_ServerHandler__["a" /* ServerHandler */](canvasHelper, userRenderer, floor.floorGenerator, nameGenerator, background));
socket.setController(new __WEBPACK_IMPORTED_MODULE_3__controllers_Controller__["a" /* Controller */]());

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
        new __WEBPACK_IMPORTED_MODULE_8__models_server_Messagebox__["a" /* MessageBox */](nameGenerator, socket.io);
    
        canvasHelper.render();
    }, () => {
        console.error(`Failed to connect with ${name}`);

        nameGenerator.generateName();
        name = nameGenerator.name;
        connect();
    });
}
connect();

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Palette__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_TickHelper__ = __webpack_require__(0);



class CanvasHelper
{
    constructor()
    {
        this.items = [];

        this.canvas  = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.palette = new __WEBPACK_IMPORTED_MODULE_0__utils_Palette__["a" /* Palette */]();
        this.COLOR   = this.palette.next();

        document.body.appendChild(this.canvas);

        this.paletteTicker = new __WEBPACK_IMPORTED_MODULE_1__utils_TickHelper__["a" /* TickHelper */](10000, () => {
            this.COLOR = this.palette.next();
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
        this.paletteTicker.tick();

        this.context.fillStyle = this.COLOR.BACKGROUND;
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Palette
{
    constructor()
    {
        this.palettes = [
            {
                BACKGROUND : '#bdeda8',
                HILLS      : '#57ab8270',
                FLOOR      : '#3c9179',
                USER       : '#0025409a',
                STARS      : '#FFF',
                TEXT       : '#FFF'
            },
            {
                BACKGROUND : '#90a9b7',
                HILLS      : '#27272788',
                FLOOR      : '#4e5283',
                USER       : '#cca7a29a',
                STARS      : '#d9bbf9',
                TEXT       : '#FFF'
            },
            {
                BACKGROUND : '#832161',
                HILLS      : '#da416788',
                FLOOR      : '#f0eff4',
                USER       : '#3d2645',
                STARS      : '#d9bbf9',
                TEXT       : '#FFF'
            },
            {
                BACKGROUND : '#718f94',
                HILLS      : '#90b49488',
                FLOOR      : '#dbcfb0',
                USER       : '#545775',
                STARS      : '#d9bbf9',
                TEXT       : '#FFF'
            }
        ];
    }

    next()
    {
        return this.palettes[ Math.floor(Math.random() * this.palettes.length) ];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Palette;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_TileGenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_TileRenderer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Star__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_TickHelper__ = __webpack_require__(0);





class Background
{
    constructor()
    {
        this.tileGenerator = new __WEBPACK_IMPORTED_MODULE_0__utils_TileGenerator__["a" /* TileGenerator */](150, 80, 50, 4, 9);
        this.tileGenerator.populate();

        this.backgroundRenderer = new __WEBPACK_IMPORTED_MODULE_1__utils_TileRenderer__["a" /* TileRenderer */](this.tileGenerator);
        this.stars  = [];

        this.starTicker = new __WEBPACK_IMPORTED_MODULE_3__utils_TickHelper__["a" /* TickHelper */](25, () => {
            this.stars.push(new __WEBPACK_IMPORTED_MODULE_2__Star__["a" /* Star */]());
        });
    }

    renderAmbientStars(context)
    {
        this.stars.forEach((x, i) => {
            if (x.removed)
            {
                this.stars.splice(i, 1);
                return;
            }

            x.step();
            x.render(context);
        });
    }

    render(canvasHelper)
    {
        this.starTicker.tick();

        canvasHelper.context.fillStyle = canvasHelper.COLOR.STARS;
        this.renderAmbientStars(canvasHelper.context);

        canvasHelper.context.fillStyle = canvasHelper.COLOR.HILLS;
        this.backgroundRenderer.render(canvasHelper.context);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Background;


/***/ }),
/* 7 */
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

    render(context)
    {
        context.fillRect(this.x, this.y, 3, 3);
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_TileGenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_TileRenderer__ = __webpack_require__(2);



class Floor
{
    constructor()
    {
        this.floorGenerator = new __WEBPACK_IMPORTED_MODULE_0__utils_TileGenerator__["a" /* TileGenerator */](100, 30, 40, 2, 2);
        this.floorRenderer  = new __WEBPACK_IMPORTED_MODULE_1__utils_TileRenderer__["a" /* TileRenderer */](this.floorGenerator);
    }

    render(canvasHelper)
    {
        canvasHelper.context.fillStyle = canvasHelper.COLOR.FLOOR;

        this.floorRenderer.render(canvasHelper.context);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Floor;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_utils_Tween__ = __webpack_require__(10);


class Controller
{
    constructor()
    {
        this.keys = [];

        document.body.addEventListener('keydown', (event) => this.onKey(true,  event));
        document.body.addEventListener('keyup',   (event) => this.onKey(false, event));

        this.addKey(37, () => this.onKeyLeft());
        this.addKey(39, () => this.onKeyRight());
        this.addKey(38, () => this.onKeyUp());
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tween
{
    constructor(tweenCommand, delay, stackable)
    {
        this.tweenCommand = tweenCommand;
        this.maxTicks     = delay;
        this.ticks        = (delay==null) ? null : 0;
        this.stackable    = stackable;
    }

    trigger()
    {
        if (this.ticks == null) return;
        if (this.ticks > 0 && !this.stackable) return;

        this.ticks = this.maxTicks;
    }

    tick()
    {
        if (this.ticks === 0) return;

        this.tweenCommand();
        if (this.ticks == null) return;

        this.ticks--;
        if (this.ticks < 0) this.ticks = 0;
    }
}
/* unused harmony export Tween */


/***/ }),
/* 11 */
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
        this.audio.volume = 0.03;
        this.audio.style.display = 'none';

        document.body.appendChild(this.audio);

        this.audio.play();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Music;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Socket
{
    constructor(handler)
    {
        this.handler = handler;

        this.io = io('http://localhost:8000');
        this.io.on('update',  data => this.handler.onUpdate(this.io, data));
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
                this.handler.onHandshake(this.io, data);
                successCallback();
            }
            else
            {
                failedCallback();
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ServerDisplay__ = __webpack_require__(14);


class ServerHandler
{
    constructor(canvasHelper, userRenderer, floorGenerator, nameGenerator, background)
    {
        this.canvasHelper   = canvasHelper;
        this.userRenderer   = userRenderer;
        this.floorGenerator = floorGenerator;
        this.nameGenerator  = nameGenerator;
        this.background     = background;
        this.serverDisplay  = new __WEBPACK_IMPORTED_MODULE_0__ServerDisplay__["a" /* ServerDisplay */]();
    }

    onUpdate(socket, data)
    {
        this.floorGenerator.tiles  = data.floors;
        this.floorGenerator.offset = data.floorOffset;
        this.serverDisplay.update(data, this.nameGenerator.name);
        this.userRenderer.update(data.players);

        if (data.floorUpdated)
        {
            if (Math.random() > .8)
            {
                this.background.tileGenerator.next();
            }
        }
    }

    onHandshake(socket, data)
    {
        this.nameGenerator.save(data.name);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ServerHandler;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ServerDisplay
{
    constructor()
    {
        this.container    = document.createElement('div');
        this.container.id = 'server-display';

        document.body.appendChild(this.container);
    }

    getTop5(list, identifier)
    {
        let top5 = document.createElement('div');
        top5.className = 'top5';

        if (list.length > 0)
        {
            top5.innerHTML = '<div class="title">top 5</div>';

            list.forEach(x => {
                top5.innerHTML += this.drawItem(x, identifier);
            });
        }

        return top5;
    }

    drawItem(item, name)
    {
        let ownerClass = (item.name == name) ? 'owner' : '';

        return `<div class="item ${ownerClass}"><span class="name">${item.name}</span><span class="score">${item.score}</span></div>`;
    }

    getUptime(time)
    {
        let uptime = document.createElement('div');
        uptime.className = 'uptime';
        uptime.innerHTML = `Running since ${time}`;

        return uptime;
    }

    getPlayers(list, name)
    {
        let players = document.createElement('div');
        players.className = 'players';
        players.innerHTML += '<div class="title">Players</div>';

        list.forEach(x => {
            if (x.name)
            {
                players.innerHTML += this.drawItem(x, name);
            }
            else
            {
                players.innerHTML += `<span><em>pending...</em></span>`;
            }
        });

        return players;
    }

    update(object, name)
    {
        this.container.innerHTML = '';

        this.container.appendChild(this.getUptime(object.uptime));
        this.container.appendChild(this.getTop5(object.top5, name));
        this.container.appendChild(this.getPlayers(object.players, name));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ServerDisplay;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const USER_WIDTH  = 30;
const USER_HEIGHT = 30;

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
        canvasHelper.context.fillStyle = canvasHelper.COLOR.TEXT;
        canvasHelper.context.fillText(player.score,
                                      player.position.x - ((player.score.toString().length / 2) * 14),
                                      (window.innerHeight - player.position.y) - (USER_HEIGHT + 20));
    }

    render(canvasHelper)
    {
        this.players.forEach(player => {
            let dx = player.position.x - USER_WIDTH/2;
            let dy = window.innerHeight - player.position.y;

            canvasHelper.context.fillStyle = canvasHelper.COLOR.USER;
            canvasHelper.context.font      = '20px Courier';
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
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserRenderer;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MessageBox
{
    constructor(nameGenerator, io)
    {
        this.nameGenerator = nameGenerator;
        this.name          = name;
        this.io            = io;
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

        this.io.on('message', (data) => this.addMessage(this.nameGenerator.name, data.message));

        this.addWelcomeMessage();
    }

    addMessage(name, message)
    {
        this.messageBox.innerHTML += `<div class="item"><span class="name">${name}</span>: ${message}</div>`;
        this.messageBox.scrollTo(0, this.messageBox.scrollHeight);
    }

    addWelcomeMessage()
    {
        this.messageBox.innerHTML += '<div class="item-break-word">Welcome visitor! Outplay your enemies by sliding faster and beat them. Change name with /name in chat.</div>';
    }

    onKey(event)
    {
        if (event.keyCode == 13)
        {
            this.io.emit('message', {
                name    : this.nameGenerator.name,
                message : this.inputField.value
            });

            this.inputField.value = '';
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MessageBox;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class NameGenerator
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
/* harmony export (immutable) */ __webpack_exports__["a"] = NameGenerator;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FullScreen
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
/* harmony export (immutable) */ __webpack_exports__["a"] = FullScreen;


/***/ })
/******/ ]);