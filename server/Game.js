import Player from './Models/Player';
import Bullet from './Models/Bullet';
import SocketHandler from './SocketHandler';
import * as Constants from './Constants';
import * as Utils from './Helper/Utils';

export default class Game {

    constructor(io) {
        this.lastPlayderID = 0;
        this.OBJECT_LIST = [];
        this.PLAYER_LIST = [];
        this.socketHandler = new SocketHandler(this, io);
    }

    addPlayer(playerName) {
        var newPlayer = new Player(this.lastPlayderID++, playerName, Utils.randomInt(100,400), Utils.randomInt(100,400));
        this.PLAYER_LIST[newPlayer.id] = newPlayer;
        return newPlayer;
    }

    restartPlayer(player) {
        if(player.health <= 0) {
            player.restart(this.randomInt(100,400), this.randomInt(100,400));
        }
    }

    shoot(player, pointer) {
        if(!player.stun && player.gcd <= 0) {
            var angle = Math.atan2(pointer.y - player.y, pointer.x - player.x);
            var bullet = new Bullet(Math.random(), player.id, player.x, player.y, angle);
            this.OBJECT_LIST.push(bullet);
            this.gcd = Constants.GCD;
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
        setInterval(function() { self.loop() }, 1000 / Constants.FPS);
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