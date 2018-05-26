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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
    constructor(blockWidth, blockHeight, maxBlocks, minBlockHeight, maxBlockHeight, noFlats)
    {
        this.blockWidth     = blockWidth;
        this.blockHeight    = blockHeight;
        this.maxBlocks      = maxBlocks;
        this.angle          = Math.atan2(blockHeight, blockWidth);
        this.minBlockHeight = minBlockHeight;
        this.maxBlockHeight = maxBlockHeight;
        this.noFlats        = noFlats;

        this.tiles  = [];
        this.offset = 0;
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
        let height = (this.tiles.length > 0) ? this.tiles[this.tiles.length - 1] : this.minBlockHeight;
        height    += (Math.random() > .5) ? 1 : -1;

        if (height > this.maxBlockHeight) height = (this.noFlats) ? this.maxBlockHeight - 1 : this.maxBlockHeight;
        if (height < this.minBlockHeight) height = (this.noFlats) ? this.minBlockHeight + 1 : this.minBlockHeight;

        this.tiles.push(height);
    }

    next()
    {
        this.offset++;

        if (this.offset > this.blockWidth)
        {
            this.tiles.shift();
            this.generate();
            this.offset-=this.blockWidth;
        }
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
        ctx.moveTo(0, this.tileGenerator.tiles[0] * this.tileGenerator.blockHeight);

        this.tileGenerator.tiles.forEach((height, i) => {
            let x = i * this.tileGenerator.blockWidth - this.tileGenerator.offset;
            let y = window.innerHeight - (height * this.tileGenerator.blockHeight);
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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_CanvasHelper__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_ambient_Background__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Floor__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_Controller__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_ambient_Music__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_server_Socket__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_server_SocketHandler__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_utils_UserRenderer__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_server_Messagebox__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_NameGenerator__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_ambient_FullScreen__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__models_utils_PingDisplay__ = __webpack_require__(3);













new __WEBPACK_IMPORTED_MODULE_4__models_ambient_Music__["a" /* Music */]();
new __WEBPACK_IMPORTED_MODULE_10__models_ambient_FullScreen__["a" /* FullScreen */]();

let nameGenerator = new __WEBPACK_IMPORTED_MODULE_9__models_NameGenerator__["a" /* NameGenerator */]();
let canvasHelper  = new __WEBPACK_IMPORTED_MODULE_0__models_CanvasHelper__["a" /* CanvasHelper */]();
let pingDisplay   = new __WEBPACK_IMPORTED_MODULE_11__models_utils_PingDisplay__["a" /* PingDisplay */]();

let background    = new __WEBPACK_IMPORTED_MODULE_1__models_ambient_Background__["a" /* Background */]();
let floor         = new __WEBPACK_IMPORTED_MODULE_2__models_Floor__["a" /* Floor */]();
let userRenderer  = new __WEBPACK_IMPORTED_MODULE_7__models_utils_UserRenderer__["a" /* UserRenderer */]();
let socket        = new __WEBPACK_IMPORTED_MODULE_5__models_server_Socket__["a" /* Socket */](new __WEBPACK_IMPORTED_MODULE_6__models_server_SocketHandler__["a" /* SocketHandler */](canvasHelper, userRenderer, floor.floorGenerator, nameGenerator, background, pingDisplay));
socket.setController(new __WEBPACK_IMPORTED_MODULE_3__controllers_Controller__["a" /* Controller */]());

canvasHelper.add(background);
canvasHelper.add(floor);
canvasHelper.add(userRenderer);
canvasHelper.add(pingDisplay);

let name = nameGenerator.get();
let connect = () => {
    socket.join(name, () => {
        new __WEBPACK_IMPORTED_MODULE_8__models_server_Messagebox__["a" /* MessageBox */](nameGenerator, socket);

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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Palette__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_TickHelper__ = __webpack_require__(0);



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

        this.palette = new __WEBPACK_IMPORTED_MODULE_0__utils_Palette__["a" /* Palette */]();
        this.COLOR   = this.palette.next();

        document.body.appendChild(this.canvas);

        this.paletteTicker = new __WEBPACK_IMPORTED_MODULE_1__utils_TickHelper__["a" /* TickHelper */](10000, () => {
            this.COLOR = this.palette.next();
        });

        this.context.filter      = FILTER;
        window.addEventListener('resize', () => {
            this.canvas.width  = window.innerWidth;
            this.canvas.height = window.innerHeight;
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
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_TileGenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_TileRenderer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Star__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_TickHelper__ = __webpack_require__(0);





class Background
{
    constructor()
    {
        this.tileGenerator = new __WEBPACK_IMPORTED_MODULE_0__utils_TileGenerator__["a" /* TileGenerator */](150, 80, 50, 4, 9, true);
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
/* 8 */
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_TileGenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_TileRenderer__ = __webpack_require__(2);



class Floor
{
    constructor()
    {
        this.floorGenerator = new __WEBPACK_IMPORTED_MODULE_0__utils_TileGenerator__["a" /* TileGenerator */](90, 30, 40, 2, 2);
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_utils_Tween__ = __webpack_require__(11);


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
        this.addKey(32, () => this.onKeyUp());
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
/* 11 */
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
/* 12 */
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
        document.body.addEventListener('click', () => this.request());
    }

    request()
    {
        this.audio.play();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Music;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Socket
{
    constructor(handler)
    {
        this.handler = handler;

        this.io = io((window.location.href.indexOf('localhost') !== -1) ? 'http://localhost:8080' : 'http://hurdlr-hurdlr.a3c1.starter-us-west-1.openshiftapps.com');
        this.io.on('update', data => this.onUpdate(data));
    }

    onUpdate(data)
    {
        this.handler.onSyncTick();

        if (data.top5)
        {
            this.handler.onScore(this.io, data);
        }

        if (data.floors)
        {
            this.handler.onFloor(this.io, data);
        }

        if (data.players)
        {
            data.players.forEach(x => {
                if (x.id == this.io.id)
                {
                    x.owned = true;
                }
            });

            this.handler.onPlayers(this.io, data);
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
                this.handler.onHandshake(this.io, data);
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InfoDisplay__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_PingDisplay__ = __webpack_require__(3);



class SocketHandler
{
    constructor(canvasHelper, userRenderer, floorGenerator, nameGenerator, background, pingDisplay)
    {
        this.canvasHelper   = canvasHelper;
        this.userRenderer   = userRenderer;
        this.floorGenerator = floorGenerator;
        this.nameGenerator  = nameGenerator;
        this.background     = background;
        this.pingDisplay    = pingDisplay;
        this.infoDisplay    = new __WEBPACK_IMPORTED_MODULE_0__InfoDisplay__["a" /* InfoDisplay */]();
    }

    onScore(socket, data)
    {
        this.infoDisplay.top5 = data.top5;
        this.infoDisplay.draw();
    }

    onFloor(socket, data)
    {
        this.floorGenerator.tiles  = data.floors;
        this.floorGenerator.offset = data.offset;

        this.background.tileGenerator.next();
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
        this.nameGenerator.save(data.name);
        this.infoDisplay.name = data.name;
        this.infoDisplay.draw();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SocketHandler;


/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const USER_WIDTH  = 30;
const USER_HEIGHT = 30;

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
        canvasHelper.context.fillStyle = canvasHelper.COLOR.TEXT;
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

            canvasHelper.context.fillStyle = canvasHelper.COLOR.USER;
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
/* 17 */
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
/* 18 */
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
/* 19 */
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