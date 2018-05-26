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
class ScoreHandler
{
    constructor()
    {
        this.top5    = [];
        this.updated = true;
    }

    update(players)
    {
        this.updated = false;

        players.forEach(x => {
            let p = this.top5.find(y => y.name == x.name);
            if (p)
            {
                return;
            }

            if (this.top5.length < 5)
            {
                this.top5.push(x);
                this.updated = true;
                return;
            }

            let pi = this.top5.findIndex(y => y.score < x.score);
            if (pi !== -1)
            {
                console.log(pi);
                this.top5.splice(pi, 1, x);
                this.updated = true;
            }
        });
    }

    getTop5()
    {
        return this.top5;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ScoreHandler;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class TickHandler
{
    constructor(callback)
    {
        this.callback = callback;

        setInterval(() => this.callback(), 15);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TickHandler;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Uptime__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Uptime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_Uptime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers_Server__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Floor__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_SocketManager__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_ScoreHandler__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__controllers_SocketController__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_PlayerManager__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_TickHandler__ = __webpack_require__(1);










let server = new __WEBPACK_IMPORTED_MODULE_1__controllers_Server__["a" /* Server */]();
let floor  = new __WEBPACK_IMPORTED_MODULE_2__models_Floor__["a" /* Floor */](2, 15);

let playerManager    = new __WEBPACK_IMPORTED_MODULE_6__models_PlayerManager__["a" /* PlayerManager */](floor);
let socketController = new __WEBPACK_IMPORTED_MODULE_5__controllers_SocketController__["a" /* SocketController */](playerManager, floor);
let socketManager    = new __WEBPACK_IMPORTED_MODULE_3__models_SocketManager__["a" /* SocketManager */](server, socketController);

let tickHandler = new __WEBPACK_IMPORTED_MODULE_7__models_TickHandler__["a" /* TickHandler */](() => {
    playerManager.onTick();

    socketController.onUpdateRequest(socketManager.io);
});

server.listen(process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
              process.env.IP   || process.env.OPENSHIFT_NODEJS_IP   || '0.0.0.0');

/***/ }),
/* 3 */
/***/ (function(module, exports) {

let date = new Date();

let prepend = (val) => {
    return val < 10 ? '0' + val : val;
};

process.env.UPTIME = date.toLocaleDateString('nl-NL') + ` ${prepend(date.getHours())}:${prepend(date.getMinutes())}:${prepend(date.getSeconds())}`;
console.log(`Starting server at ${process.env.UPTIME}`);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_http__);



class Server
{
    constructor()
    {
        return this.server = __WEBPACK_IMPORTED_MODULE_1_http___default.a.createServer((request, response) =>
        {
            if (!request.url || request.url == '/')
            {
                request.url = '/index.html';
            }
        
            __WEBPACK_IMPORTED_MODULE_0_fs___default.a.readFile('./client' + request.url, (error, data) => {
                if (error)
                {
                    response.writeHead(500);
                    response.end(JSON.stringify(error));
                    return;
                }
        
                response.writeHead(200);
                response.end(data);
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Server;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FloorCalculator__ = __webpack_require__(8);


class Floor
{
    constructor(minBlockHeight, maxBlockHeight)
    {
        this.blockWidth     = 100;
        this.blockHeight    = 30;
        this.maxBlocks      = 100;
        this.minBlockHeight = 2;
        this.maxBlockHeight = 9;
        this.angle          = Math.atan2(this.blockHeight, this.blockWidth);
        this.offset         = 0;
        this.updated        = true;
        this.calculator     = new __WEBPACK_IMPORTED_MODULE_0__FloorCalculator__["a" /* FloorCalculator */](this);
        this.locations      = [this.minBlockHeight];

        for (let i=0; i<this.maxBlocks; i++)
        {
            this.next();
        }
    }

    setOffset(offset)
    {
        if (offset > 0.2)
        {
            this.updated = true;
        }

        this.offset += offset;

        if (this.offset > this.blockWidth)
        {
            this.offset -= this.blockWidth;
            this.next();
        }
    }

    next()
    {
        let height = this.locations[ this.locations.length - 1 ] + ((Math.random() > .5) ? 1 : -1);
        if (height > this.maxBlockHeight) height = this.maxBlockHeight;
        if (height < this.minBlockHeight) height = this.minBlockHeight;

        if (this.locations.length >= 50)
        {
            this.locations.shift();
        }

        this.locations.push(height);

        return height;
    }

    getHeight(offset)
    {
        let index = this.getTileIndexByWidth(width);
        let rw    = index * this.tileGenerator.BLOCK_WIDTH;
        let rh    = this.getTile(index) * this.tileGenerator.BLOCK_HEIGHT;
        let dx    = width - rw;

        let remainder = dx * (this.tileGenerator.BLOCK_HEIGHT / this.tileGenerator.BLOCK_WIDTH);
        let slope     = this.getSlopeByWidth(width) * remainder || 0;

        let height = rh + slope;

        return 1080 - height;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Floor;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FloorCalculator
{
    constructor(floor)
    {
        this.floor = floor;
    }

    getHeightByOffset(offset)
    {
        offset += this.floor.offset;

        let index = this.getTileIndexByOffset(offset);
        let rw    = index * this.floor.blockWidth;
        let rh    = this.getTile(index) * this.floor.blockHeight;
        let dx    = offset - rw;

        let remainder = dx * (this.floor.blockHeight / this.floor.blockWidth);
        let slope     = this.getSlopeByOffsetWithoutFloorOffset(offset) * remainder || 0;

        let height = rh + slope;

        return height;
    }

    getSlopeByOffsetWithoutFloorOffset(offset)
    {
        let tileIndex = this.getTileIndexByOffset(offset);
    
        let height     = this.getTile(tileIndex);
        let nextHeight = this.getTile(tileIndex + 1) || height;
    
        return nextHeight - height;
    }

    getSlopeByOffset(offset)
    {
        return this.getSlopeByOffsetWithoutFloorOffset(offset + this.floor.offset);
    }

    getTileIndexByOffset(offset)
    {
        return Math.floor(offset / this.floor.blockWidth);
    }

    getTile(tileIndex)
    {
        return this.floor.locations[tileIndex];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FloorCalculator;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SocketManager
{
    constructor(app, socketController)
    {
        this.io               = __webpack_require__(10)(app);
        this.socketController = socketController;
    
        this.io.on('connection', socket => this.onConnect(socket));
    }

    onConnect(socket)
    {
        socket.on('join', (data) => {
            if (this.socketController.onJoin(socket, data))
            {
                socket.emit('handshake', { result : true, name : data.name, uptime : process.env.UPTIME });
                this.socketController.onUpdateRequest(this.io, true);
                return;
            }

            socket.emit('handshake', { result : false });
        });

        socket.on('action', (data) => {
            if (this.socketController.onAction(socket, data))
            {
                this.socketController.onUpdateRequest(this.io);
            }
        });

        socket.on('disconnect', () => {
            if (this.socketController.onDisconnect(socket))
            {
                this.socketController.onUpdateRequest(this.io);
            }
        });

        socket.on('message', (data) => {
            if (this.socketController.onMessage(socket, data))
            {
                this.io.emit('message', data);
                return;
            }

            this.socketController.onUpdateRequest(this.io, true);
        })
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SocketManager;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SocketController
{
    constructor(playerManager, floor)
    {
        this.playerManager = playerManager;
        this.floor         = floor;
    }

    onJoin(socket, data)
    {
        if (this.playerManager.createNewPlayer(socket.id, data.name))
        {
            return true;
        }

        return false;
    }

    onAction(socket, data)
    {
        let user = this.playerManager.get(socket.id);
        if (user)
        {
            user.updateMoveState(data);
            return true;
        }

        return false;
    }

    onMessage(socket, data)
    {
        if (data.message.toLowerCase().startsWith('/name'))
        {
            let parts = data.message.split(' ');
            let user  = this.playerManager.get(socket.id);
            if (user)
            {
                user.name = parts[1];

                socket.emit('handshake', { result : true, name : user.name });
            }

            return false;
        }

        return true;
    }

    onDisconnect(socket)
    {
        this.playerManager.remove(socket.id);
        return true;
    }

    onUpdateRequest(io, force)
    {
        this.playerManager.scoreHandler.update(this.playerManager.players);

        let updates = {};

        if (this.playerManager.scoreHandler.updated || force)
        {
            updates.top5 = this.playerManager.scoreHandler.getTop5();
        }

        if (this.floor.updated || force)
        {
            updates.floors = this.floor.locations;
            updates.offset = this.floor.offset;
            this.floor.updated = false;
        }

        if (this.playerManager.updated || force)
        {
            updates.players = this.playerManager.players;
        }

        io.emit('update', updates);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SocketController;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ScoreHandler__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__User__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TickHandler__ = __webpack_require__(1);




class PlayerManager
{
    constructor(floor)
    {
        this.players      = [];
        this.floor        = floor;
        this.scoreHandler = new __WEBPACK_IMPORTED_MODULE_0__ScoreHandler__["a" /* ScoreHandler */]();
        this.updated      = true;
    }

    onTick()
    {
        this.updated = false;
        this.players.forEach((x, i) => {
            let position = x.position.clone();

            x.tick(this.floor);
            x.score++;

            x.applyGravity(this.floor);
            x.updateAngle(this.floor);

            if (x.position.x > 800)
            {
                let offset = x.position.x - 800;

                this.players.forEach(y => y.position.x -= offset);
                this.floor.setOffset(offset);

                x.score += this.players.length - 1;
            }

            if (x.isOutOfBounds())
            {
                x.reset();
            }

            if (!x.position.proximates(position, 0.01))
            {
                this.updated = true;
            }
        });
    }

    get(socketId)
    {
        return this.players.find(x => x.id == socketId);
    }

    remove(socketId)
    {
        let index = this.players.findIndex(x => x.id == socketId);
        if (index !== -1)
        {
            this.players.splice(index, 1);
        }

        return true;
    }

    createNewPlayer(socketId, name)
    {
        let player = this.players.find(x => x.name == name);
        if (player) return false;

        this.players.push(new __WEBPACK_IMPORTED_MODULE_1__User__["a" /* User */](socketId, name));

        return true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerManager;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(14);


const LEFT  = 37;
const UP    = 38;
const RIGHT = 39;

const HILL_SPEED = 3;
const SPEED      = 5;
const RAMP_SPEED = 12;

const MAX_SPEED     = 50;
const JUMP_SPEED    = 20;
const JUMP_TICKS    = 20;
const GRAVITY_SPEED = 12;
const TWEEN_SPEED   = 0.15;

class User
{
    constructor(socketId, name)
    {
        this.id        = socketId;
        this.name      = name;

        this.reset();
    }

    reset()
    {
        this.position  = new __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* Vector */](100 + Math.round(Math.random() * 100), 400);
        this.velocityX = 0;
        this.score     = 0;
        this.angle     = 0;
        this.isJumping = true;
        this.jumpTick  = 0;

        this.movements = {
            left  : false,
            right : false,
            up    : false
        };
    }

    getSlopeSpeed(slope, inverse)
    {
        if (this.isJumping) return SPEED;

        if (slope > 0)
        {
            return (inverse) ? RAMP_SPEED : HILL_SPEED;
        }
        else if (slope < 0)
        {
            return (inverse) ? HILL_SPEED : RAMP_SPEED;
        }

        return SPEED;
    }

    tick(floor)
    {
        if (this.movements.left)
        {
            let slope = floor.calculator.getSlopeByOffset(this.position.x);
            this.velocityX -= this.getSlopeSpeed(slope, true);
        }

        if (this.movements.right)
        {
            let slope = floor.calculator.getSlopeByOffset(this.position.x);
            this.velocityX += this.getSlopeSpeed(slope);
        }

        if (this.movements.up && !this.isJumping)
        {
            this.isJumping = true;
            this.jumpTick  = JUMP_TICKS;
        }

        if (this.jumpTick >= 0)
        {
            this.jumpTick--;
            this.position.y += JUMP_SPEED;
        }

        let stepMove = Math.min(this.velocityX * TWEEN_SPEED, MAX_SPEED);
        this.position.x += stepMove;
        this.velocityX  -= stepMove;
    }

    updateMoveState(action)
    {
        if (action.key ==  LEFT) this.movements.left  = action.activated;
        if (action.key == RIGHT) this.movements.right = action.activated;
        if (action.key ==    UP) this.movements.up    = action.activated;
    }

    applyGravity(floor)
    {
        let height = floor.calculator.getHeightByOffset(this.position.x);
        if (this.position.y >= height && this.isJumping)
        {
            this.position.y -= GRAVITY_SPEED;
            return;
        }

        this.isJumping  = false;
        this.position.y = height;
    }

    updateAngle(floor)
    {
        if (this.isJumping) return 0;

        this.angle = floor.calculator.getSlopeByOffset(this.position.x) * floor.angle;
    }

    isOutOfBounds()
    {
        return (this.position.x + 15 < 0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = User;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vector
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    clone()
    {
        return new Vector(this.x, this.y);
    }

    equals(vector)
    {
        return (this.x == vector.x && this.y == vector.y);
    }

    proximates(vector, offset)
    {
        return (vector.x > this.x - offset &&
                vector.x < this.x + offset &&
                vector.y > this.y - offset &&
                vector.y < this.y + offset);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vector;


/***/ })
/******/ ]);