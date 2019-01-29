import Player from './Player';
import Bullet from './Bullet';
import SocketHandler from './SocketHandler';

export default class Game {

    constructor(io) {
        this.lastPlayderID = 0;
        this.BULLET_SPEED = 5;
        this.OBJECT_LIST = [];
        this.PLAYER_LIST = [];
        this.socketHandler = new SocketHandler(this, io);
    }

    addPlayer(playerName) {
        var newPlayer = new Player(this.lastPlayderID++, playerName, this.randomInt(100,400), this.randomInt(100,400));
        this.PLAYER_LIST[newPlayer.id] = newPlayer;
        return newPlayer;
    }

    shoot(player, pointer) {
        if(!player.stun) {
            var angle = Math.atan2(pointer.y - player.y, pointer.x - player.x);
            var velocityX = Math.cos(angle) * this.BULLET_SPEED;
            var velocityY = Math.sin(angle) * this.BULLET_SPEED;

            var bullet = new Bullet(Math.random(), player.id, player.x, player.y, velocityX, velocityY);
            this.OBJECT_LIST.push(bullet)
        }
    }

    addObject() {

    }

    removePlayer(id) {
        delete this.PLAYER_LIST[id];
        this.PLAYER_LIST.splice(this.PLAYER_LIST, id);
    }

    start() {
        var self = this;
        setInterval(function() { self.loop() }, 1000/25);
    }

    loop() {
        var pack = {
            players:[],
            objects:[]
        }
    
        for(var objectIndex in this.OBJECT_LIST){
            var object = this.OBJECT_LIST[objectIndex];
            if(object.destroy){
                delete this.OBJECT_LIST[objectIndex];
                this.OBJECT_LIST.splice(objectIndex, 1);
            }
    
            object.updatePosition(this.PLAYER_LIST);
        }
    
        pack.objects = this.OBJECT_LIST;
    
        for(var socketIndex in this.PLAYER_LIST){
            var player = this.PLAYER_LIST[socketIndex];
            if(player){
                player.updatePosition();
                pack.players.push(player);
            }
        };
    
        this.socketHandler.emitState(pack);
    }

    randomInt(low, high){
        return Math.floor(Math.random() * (high - low) + low);
    }
    
    getAllPlayers(player){
        var players = [];
        this.PLAYER_LIST.forEach(function(otherPlayer){
            if(otherPlayer && player.id != otherPlayer.id){
                players.push(otherPlayer);
            }
        });
        return players;
    }
}