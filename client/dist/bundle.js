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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_TileCalculator__ = __webpack_require__(11);


const USER_WIDTH  = 30;
const USER_HEIGHT = 30;
const START_X     = window.innerWidth / 3;
const START_Y     = 200;

class User
{
    constructor(floorGenerator)
    {
        this.floorGenerator = floorGenerator;
        this.tileCalculator = new __WEBPACK_IMPORTED_MODULE_0__utils_TileCalculator__["a" /* TileCalculator */](this.floorGenerator);
        this.jumping        = false;
        this.offset         = 0;

        this.x     = START_X;
        this.y     = START_Y;
        this.score = 0;
    }

    onLeft()
    {
        if (this.jumping)
        {
            this.x -= 3;
            return;
        }

        let slope = this.tileCalculator.getSlopeByWidth(this.x + this.offset);

        this.x -= 3;
        if (slope > 0) this.x-=2;
        if (slope < 0) this.x+=1;
    }

    onRight()
    {
        if (this.jumping)
        {
            this.x += 3;
            return;
        }

        let slope = this.tileCalculator.getSlopeByWidth(this.x + this.offset);

        this.x += 3;
        if (slope < 0) this.x+=2;
        if (slope > 0) this.x-=1;
    }

    onJump()
    {
        this.y -= 15;
    }

    onGravity()
    {
        let minHeight = this.tileCalculator.getHeightByWidth(this.x + this.offset);
        if (this.y - USER_HEIGHT < minHeight)
        {
            this.y += 8;
        }

        if (this.y >= minHeight)
        {
            if (this.onJumpEnd) this.onJumpEnd();

            this.jumping = false;
            this.y       = minHeight;
        }

        if (minHeight - this.y > 150)
        {
            this.y = minHeight - 150;
        }
    }

    renderScore(canvasHelper)
    {
        canvasHelper.context.fillStyle = canvasHelper.COLOR.TEXT;
        canvasHelper.context.font      = '20px Courier';
        canvasHelper.context.fillText(this.score, this.x - ((this.score.toString().length / 2) * 14), this.y - (USER_HEIGHT + 20));
    }

    checkOutOfBounds(canvasHelper)
    {
        if (this.x > window.innerWidth) this.x = window.innerWidth;
        if (this.x < -USER_WIDTH)
        {
            this.x     = START_X;
            this.y     = START_Y;
            this.score = 0;
        }
    }

    setController(controller)
    {
        this.controller = controller;
    }

    setCamera(camera)
    {
        this.camera = camera;
    }

    render(canvasHelper)
    {
        this.checkOutOfBounds(canvasHelper);
        this.onGravity();

        if (this.controller) this.controller.tick();
        if (this.camera)     this.camera.tick();

        this.score++;
        canvasHelper.context.fillStyle = canvasHelper.COLOR.USER;

        let dx    = this.x - USER_WIDTH/2;
        let slope = this.tileCalculator.getSlopeByWidth(this.x + this.offset);
        let angle = (slope * -this.floorGenerator.ANGLE) || 0;

        if (!this.jumping)
        {
            canvasHelper.context.save();
            canvasHelper.context.translate(this.x, this.y);
            canvasHelper.context.rotate(angle);
            canvasHelper.context.translate(-this.x, -this.y);
            canvasHelper.context.fillRect(dx, this.y, USER_WIDTH, -USER_HEIGHT);
            this.renderScore(canvasHelper);
            canvasHelper.context.restore();
        }
        else
        {
            canvasHelper.context.fillRect(dx, this.y, USER_WIDTH, -USER_HEIGHT);
            this.renderScore(canvasHelper);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = User;


/***/ }),
/* 4 */
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Tween;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_CanvasHelper__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_ambient_Background__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Floor__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_User__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controllers_UserController__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_ambient_Music__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_server_Socket__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_server_ServerHandler__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__controllers_CameraController__ = __webpack_require__(17);










new __WEBPACK_IMPORTED_MODULE_5__models_ambient_Music__["a" /* Music */]();

let identifier = 'player' + Math.floor(Math.random() * 100000).toString(16);

let canvasHelper = new __WEBPACK_IMPORTED_MODULE_0__models_CanvasHelper__["a" /* CanvasHelper */]();
let floor        = new __WEBPACK_IMPORTED_MODULE_2__models_Floor__["a" /* Floor */]();
let user         = new __WEBPACK_IMPORTED_MODULE_3__models_User__["a" /* User */](floor.floorGenerator);
let socket       = new __WEBPACK_IMPORTED_MODULE_6__models_server_Socket__["a" /* Socket */](new __WEBPACK_IMPORTED_MODULE_7__models_server_ServerHandler__["a" /* ServerHandler */](canvasHelper, floor.floorGenerator, identifier, user));

user.setController(new __WEBPACK_IMPORTED_MODULE_4__controllers_UserController__["a" /* UserController */](user, socket));
user.setCamera(new __WEBPACK_IMPORTED_MODULE_8__controllers_CameraController__["a" /* CameraController */](user, socket, floor));

canvasHelper.add(new __WEBPACK_IMPORTED_MODULE_1__models_ambient_Background__["a" /* Background */]());
canvasHelper.add(floor);
canvasHelper.add(user);

socket.join(user, () => {
    canvasHelper.render();
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Palette__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_TickHelper__ = __webpack_require__(1);



class CanvasHelper
{
    constructor()
    {
        this.items = [];

        this.canvas  = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.palette       = new __WEBPACK_IMPORTED_MODULE_0__utils_Palette__["a" /* Palette */]();
        this.COLOR         = this.palette.next();
        this.paletteTicker = new __WEBPACK_IMPORTED_MODULE_1__utils_TickHelper__["a" /* TickHelper */](10000, () => {
            this.COLOR = this.palette.next();
        });

        document.body.appendChild(this.canvas);
        window.addEventListener('resize', () => this.onResize());
    }

    onResize()
    {
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
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
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_TileGenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_TileRenderer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Star__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_TickHelper__ = __webpack_require__(1);





class Background
{
    constructor()
    {
        this.tileGenerator = new __WEBPACK_IMPORTED_MODULE_0__utils_TileGenerator__["a" /* TileGenerator */](200, 80, 50, 4, 9);
        this.tileGenerator.populate();

        this.backgroundRenderer = new __WEBPACK_IMPORTED_MODULE_1__utils_TileRenderer__["a" /* TileRenderer */](this.tileGenerator);
        this.stars  = [];
        this.tileTicker = new __WEBPACK_IMPORTED_MODULE_3__utils_TickHelper__["a" /* TickHelper */](80, () => {
            this.tileGenerator.next();
        });

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
        this.tileTicker.tick();
        this.starTicker.tick();

        canvasHelper.context.fillStyle = canvasHelper.COLOR.STARS;
        this.renderAmbientStars(canvasHelper.context);

        canvasHelper.context.fillStyle = canvasHelper.COLOR.HILLS;
        this.backgroundRenderer.render(canvasHelper.context);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Background;


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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_TileGenerator__ = __webpack_require__(0);
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TileGenerator__ = __webpack_require__(0);


class TileCalculator
{
    constructor(tileGenerator)
    {
        this.tileGenerator = tileGenerator;
    }

    getHeightByWidth(width)
    {
        let index = this.getTileIndexByWidth(width);
        let rw    = index * this.tileGenerator.BLOCK_WIDTH;
        let rh    = this.getTile(index) * this.tileGenerator.BLOCK_HEIGHT;
        let dx    = width - rw;

        let remainder = dx * (this.tileGenerator.BLOCK_HEIGHT / this.tileGenerator.BLOCK_WIDTH);
        let slope     = this.getSlopeByWidth(width) * remainder || 0;

        let height = rh + slope;

        return window.innerHeight - height;
    }

    getTileIndexByWidth(width)
    {
        return Math.floor(width / this.tileGenerator.BLOCK_WIDTH);
    }

    getTile(tileIndex)
    {
        return this.tileGenerator.tiles[tileIndex];
    }

    getSlopeByWidth(width)
    {
        let tileIndex = this.getTileIndexByWidth(width);

        let height     = this.getTile(tileIndex);
        let nextHeight = this.getTile(tileIndex + 1) || height;

        return nextHeight - height;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileCalculator;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_utils_Tween__ = __webpack_require__(4);


class UserController
{
    constructor(user, socket)
    {
        this.user   = user;
        this.socket = socket;

        this.keys   = [];
        this.tweens = [
            new __WEBPACK_IMPORTED_MODULE_0__models_utils_Tween__["a" /* Tween */](() => this.user.onLeft(),  15, true),
            new __WEBPACK_IMPORTED_MODULE_0__models_utils_Tween__["a" /* Tween */](() => this.user.onRight(), 15, true),
            new __WEBPACK_IMPORTED_MODULE_0__models_utils_Tween__["a" /* Tween */](() => this.user.onJump(),  25, false)
        ];

        document.body.addEventListener('keydown', (event) => this.onKey(true,  event));
        document.body.addEventListener('keyup',   (event) => this.onKey(false, event));

        this.addKey(37, () => this.tweens[0].trigger());
        this.addKey(39, () => this.tweens[1].trigger());
        this.addKey(38, () => {
            if (this.user.jumping) return;

            this.tweens[2].trigger();
            this.user.jumping = true;
        });

        this.user.onJumpEnd = () => this.onJumpEnd();
    }

    onKey(down, event)
    {
        this.keys.forEach(x => {
            if (x.key == event.keyCode)
            {
                x.activated = down;
            }
        });
    }

    onJumpEnd()
    {
        this.socket.update(this.user);
    }

    addKey(key, event)
    {
        this.keys.push({
            key,
            activated : false,
            event
        });
    }

    tick()
    {
        this.keys.forEach(x => {
            if (x.activated)
            {
                x.event();
                this.socket.update(this.user);
            }
        });

        this.tweens.forEach(x => x.tick());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserController;


/***/ }),
/* 13 */
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
        this.audio.style.display = 'none';

        document.body.appendChild(this.audio);

        //this.audio.play();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Music;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Socket
{
    constructor(handler)
    {
        this.io  = io('http://localhost:8080');

        this.handler = handler;
        this.io.on('update', data => this.handler.onUpdate(data));
        this.io.on('tile',   data => this.handler.onNewTile(data));
    }

    join(user, callback)
    {
        this.io.on('handshake', data => {
            this.handler.onHandshake(data);

            callback();
        });

        this.io.emit('join', {
            name : this.handler.identifier,
            user : {
                x       : user.x,
                y       : user.y,
                jumping : user.jumping,
                score   : user.score
            }
        });
    }

    update(user)
    {
        this.io.emit('update', {
            x       : user.x,
            y       : user.y,
            jumping : user.jumping,
            score   : user.score
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Socket;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ServerDisplay__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__User__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Tween__ = __webpack_require__(4);




class ServerHandler
{
    constructor(canvasHelper, floorGenerator, identifier, user)
    {
        this.identifier     = identifier;
        this.canvasHelper   = canvasHelper;
        this.serverDisplay  = new __WEBPACK_IMPORTED_MODULE_0__ServerDisplay__["a" /* ServerDisplay */](this.identifier);
        this.floorGenerator = floorGenerator;
        this.localPlayers   = [];
        this.user           = user;
    }

    onNewTile(data)
    {
        this.floorGenerator.tiles.push(data.tile);
    }

    onUpdate(data)
    {
        this.serverDisplay.update(data);

        data.players.forEach(player => {
            if (!player.name) return;
            if (player.name == this.identifier) return;

            let localPlayer = this.localPlayers.find(x => x.name == player.name);
            if (!localPlayer)
            {
                localPlayer = {
                    name : player.name,
                    user : new __WEBPACK_IMPORTED_MODULE_1__User__["a" /* User */](this.floorGenerator)
                };
                this.localPlayers.push(localPlayer);
                this.canvasHelper.add(localPlayer.user);
            }

            if (!localPlayer.user.jumping && player.user.jumping)
            {
                localPlayer.user.jumping = true;
            }

            if (localPlayer.user.jumping && !player.user.jumping)
            {
                localPlayer.user.jumping = false;
            }

            if (localPlayer.user.jumping)
            {
                localPlayer.user.y -= 6;
            }

            localPlayer.user.x       = player.user.x;
            localPlayer.user.score   = player.user.score;
        });

        this.localPlayers.forEach((player, playerIndex) => {
            if (!player.name) return;
            if (player.name == this.identifier) return;

            let index = data.players.findIndex(x => x.name == player.name);
            if (index === -1)
            {
                this.canvasHelper.remove(player.user);
                this.localPlayers.splice(playerIndex, 1);
            }
        });
    }

    onHandshake(data)
    {
        this.floorGenerator.tiles = data.floors;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ServerHandler;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ServerDisplay
{
    constructor(identifier)
    {
        this.identifier = identifier;

        this.container = document.createElement('div');
        this.container.id = 'server-display';

        document.body.appendChild(this.container);
    }

    getTop5(list)
    {
        let top5 = document.createElement('div');
        top5.className = 'top5';

        if (list.length > 0)
        {
            top5.innerHTML = '<strong>top 5</strong>';

            list.forEach(x => {
                top5.innerHTML += `<span>${x}</span>`;
            });
        }

        return top5;
    }

    getUptime(time)
    {
        let uptime = document.createElement('div');
        uptime.className = 'uptime';
        uptime.innerHTML = `Running since ${time}`;

        return uptime;
    }

    getPlayers(list)
    {
        let players = document.createElement('div');
        players.className = 'players';

        list.forEach(x => {
            if (x.name)
            {
                players.innerHTML += (x.name == this.identifier) ? `<span><strong>${x.name}</strong></span>` : `<span>${x.name}</span>`;
            }
            else
            {
                players.innerHTML += `<span><em>pending...</em></span>`;
            }
        });

        return players;
    }

    update(object)
    {
        this.container.innerHTML = '';

        this.container.appendChild(this.getUptime(object.uptime));
        this.container.appendChild(this.getTop5(object.top5));
        this.container.appendChild(this.getPlayers(object.players));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ServerDisplay;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const TRIGGER_DISTANCE = 600;

class CameraController
{
    constructor(user, socket, floor)
    {
        this.user   = user;
        this.socket = socket;
        this.floor  = floor;
    }

    checkForNewTiles()
    {
        if (this.user.x > TRIGGER_DISTANCE)
        {
            let offset = this.user.x - TRIGGER_DISTANCE;

            this.user.x = TRIGGER_DISTANCE;

            this.user.offset                 += offset;
            this.floor.floorGenerator.offset += offset;

            this.socket.io.emit('tile', {
                offset : offset
            });
        }
    }

    tick()
    {
        this.checkForNewTiles();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CameraController;


/***/ })
/******/ ]);