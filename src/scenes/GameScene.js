import 'phaser';
import Client from '../Client';
import Player from '../sprites/Player';
import Red from '../sprites/Red';
import PlayerInput from '../helpers/PlayerInput'
import TextDamage from '../sprites/TextDamage';
import ChatPanel from '../ui/Chat';

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
        this.disableVisibilityChange = true;
        this.client = new Client(this);
        
        this.player = null;

        this.hpList = [];
    }
    
    init(data){
        this.playerName = data.playerName;
    }
    
    preload() {
    };
    
    create(){
        this.playerMap = {};
        this.objectList = [];
    
        var map = this.make.tilemap({ key: 'map' });
        var tiles = map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
        var layer;
        for(var i = 0; i < map.layers.length; i++) {
            layer = map.createStaticLayer(i, tiles);
        }

        this.anims.create({ key:'up', frames: this.anims.generateFrameNumbers('onyx', { frames: [114, 113, 112] }), frameRate: 30, repeat: 1 });
        this.anims.create({ key:'down', frames: this.anims.generateFrameNumbers('onyx', { frames: [57, 58, 60] }), frameRate: 30, repeat: 1 });
        this.anims.create({ key:'right', frames: this.anims.generateFrameNumbers('onyx', { frames: [0, 1] }), frameRate: 30, repeat: 1 });
    
        this.client.askNewPlayer(this.playerName);
    };
    
    updateState(pack){
        for(var playerIndex in pack.players){
            var newPlayerState = pack.players[playerIndex];

            // check that player exists
            if(this.playerMap && this.playerMap[newPlayerState.id]){

                var damage = this.playerMap[newPlayerState.id].health - newPlayerState.health;
                this.playerMap[newPlayerState.id].updateState(newPlayerState);

                if(damage !==0 ) {
                    this.hpList.push(new TextDamage(this, newPlayerState.x, newPlayerState.y, damage))
                }

                if(newPlayerState.health <= 0 && this.player.id == newPlayerState.id){
                    this.gameOverPopup();
                }
            }
        }
    
        for(var objectIndex in pack.objects){
            var object = pack.objects[objectIndex];
            if(!this.objectList[object.id] && !object.destroy){
                this.addObject(object.id, object.x, object.y);
            }else{
                if(object.destroy){
                    this.removeObject(object.id);
                }else{
                    this.objectList[object.id].x = object.x;
                    this.objectList[object.id].y = object.y;
                }
            }
        }
    }
    
    gameOverPopup () {
        if(!this.gameOverScene){
            var self= this;
            this.gameOverScene = this.scene.launch('GameOverScene', { restartPushed: function(){
                self.client.restart();
                //self.scene.setVisible(false, this.gameOverScene);
                self.scene.setVisible(false, 'GameOverScene');
            }});
            // this.gameOverScene.scene.events.on('restartPushed');
        } else {
            // this.scene.setVisible(true, this.gameOverScene);
            this.scene.setVisible(true, 'GameOverScene');
        }
        this.game
        // this.scene.setActive(false, this.currentScene);
    }
    
    // player input
    update(){
        
        //we check the player input after the input is created, when the player is added to the game   
        if(this.playerInput && !this.chat.active)
            this.playerInput.checkInput();

        for(var hpIndex in this.hpList) {
            var hp = this.hpList[hpIndex];
            hp.updateState();
            if(hp && hp.remove){
                hp.destroy();
                delete this.hpList[hpIndex];
            }
        }
    }
    
    // our client player
    addPlayer(id, x , y, health, name){
        //add our player and set the camera
        this.playerMap[id] = new Player(this, x, y, health, name, id);
        this.player = this.playerMap[id];
    
        // this.cameras.main.setBounds(0,0,600,600);
        this.cameras.main.setSize(600,600);
        this.cameras.main.startFollow(this.player, true);
        this.chat = new ChatPanel(this, this.client);
        this.playerInput = new PlayerInput(this, this.client);
    }
    
    addNewPlayer(id, x, y, health, name){
        //we add a player if it isn't our player.
        if(this.playerMap[id] != this.player){
            this.playerMap[id] =  new Player(this, x, y, health, name, id);
        }
    };
    
    addObject(id, x, y){
        this.objectList[id] = new Red(this, x,y);
    }
    
    removePlayer(id){    
        this.playerMap[id].destroy();
        delete this.playerMap[id];
    }
    
    removeObject(id){
        this.objectList[id].destroy();
        delete this.objectList[id];
    }
}

export default GameScene;