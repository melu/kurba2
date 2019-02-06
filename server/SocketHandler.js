export default class SocketHandler {
    constructor(game, io){
        this.game = game;
        this.io = io;

        io.on('connection', function(socket){
            socket.on('newplayer', function(playerName){
                socket.player = game.addPlayer(playerName); 
        
                socket.emit('newplayer', socket.player);
                socket.emit('allplayers', game.getAllPlayers(socket.player));
                io.emit('newenemyplayer', socket.player);
                
                socket.on('moveUp', function(){
                    if(!socket.player.stun) socket.player._moveUp=true;
                });
                socket.on('moveDown', function(){
                    if(!socket.player.stun) socket.player._moveDown=true;
                });
                socket.on('moveLeft', function(){
                    if(!socket.player.stun) socket.player._moveLeft=true;
                });
                socket.on('moveRight', function(){
                    if(!socket.player.stun) socket.player._moveRight=true;
                });
        
                socket.on('shoot', function(pointer){
                    game.shoot(socket.player, pointer);
                })

                socket.on('dash', function(pointer){
                    socket.player.dash(pointer);
                })

                socket.on('chat', function(message){
                    io.emit('recieveChat', { name:playerName,  message:message});
                })

                socket.on('restart', function(){
                    game.restartPlayer(socket.player);
                })
        
                // gestionamos la desconexion
                socket.on('disconnect', function(){
                    io.emit('remove', socket.player.id);
                    game.removePlayer(socket.player.id);
                });
            });
        
        });
    }

    emitState(pack) {
        this.io.emit("gameState", pack);
    }
}