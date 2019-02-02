import io from 'socket.io-client';

export default class Client {
    // var game;
    // var socket;

    constructor(scene){
        this.game = scene;
        var ioUrl = (PRODUCTION)? window.location.href : "localhost:8080";
        this.socket = io.connect(ioUrl);
        var self = this;

        this.socket.on('newplayer', function(data){
            console.log("newplayer:"+data.id);
            self.game.addPlayer(data.id, data.x, data.y, data.health, data.name);
        });

        this.socket.on('newenemyplayer', function(data){
            console.log("newenemyplayer:"+data.id);
            self.game.addNewPlayer(data.id, data.x, data.y, data.health, data.name);
        });

        this.socket.on('allplayers', function(data){
            console.log(data);
            for(var i = 0; i<data.length; i++){
                self.game.addNewPlayer(data[i].id, data[i].x, data[i].y, data[i].health, data[i].name);
            }
        });

        this.socket.on('pong', function(ms){
            console.log(ms+"ms")
        })

        // this.socket.on('move', function(data){
        //     self.game.movePlayer(data.id, data.x, data.y);
        // });
        this.socket.on("gameState", function(pack){
            self.game.updateState(pack);
        })

        this.socket.on('remove', function(id){
            self.game.removePlayer(id);
        })

        this.askNewPlayer = function(name){
            this.socket.emit('newplayer', name);
        };

        this.moveUp = function(){
            this.socket.emit('moveUp');
        }
        this.moveDown = function(){
            this.socket.emit('moveDown');
        }
        this.moveLeft = function(){
            this.socket.emit('moveLeft');
        }
        this.moveRight = function(){
            this.socket.emit('moveRight');
        }

        this.shoot = function(pointer){
            this.socket.emit("shoot", pointer);
        }

        this.dash = function(pointer){
            this.socket.emit("dash", pointer);
        }

        this.chat = function(){
            this.socket.emit('chat');
        }

        this.restart = function(){
            this.socket.emit('restart');
        }

        this.socket.on('recieveChat', function(chat){
            self.game.showChat(chat);
        })
    }

};
