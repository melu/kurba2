import 'phaser';
import Client from '../Client';
import Player from '../sprites/Player';
import Red from '../sprites/Red';
import PlayerInput from '../helpers/PlayerInput'

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
        this.disableVisibilityChange = true;
        this.client = new Client(this);
        
        this.player = null;
    }
    
    // init(){
    // }
    
    preload() {
        // this.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemapTiledJSON({
            key: 'map',
            url: 'assets/map/example_map.json'
        });
        this.load.spritesheet('tileset', 'assets/map/tilesheet.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('onyx', 'assets/sprites/qgzlX80.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.image('red', 'assets/sprites/red.png');
        this.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
    };
    
    create(){
        this.playerInput = new PlayerInput(this, this.client);
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
    
        this.client.askNewPlayer();
    };
    
    updateState(pack){
        for(var playerIndex in pack.players){
            var newPlayerState = pack.players[playerIndex];

            // check that player exists
            if(this.playerMap && this.playerMap[newPlayerState.id]){
                this.playerMap[newPlayerState.id].updateState(newPlayerState);
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
    
    }
    
    // player input
    update(){
        this.playerInput.checkInput();
    }
    
    addPlayer(id, x , y, health, name){
        //add our player and set the camera
        this.playerMap[id] = new Player(this, x, y, health, name);
        this.player = this.playerMap[id];
    
        // this.cameras.main.setBounds(0,0,600,600);
        this.cameras.main.setSize(600,600);
        this.cameras.main.startFollow(this.player, true);
    }
    
    addNewPlayer(id, x, y, health, name){
        //we add a player if it isn't our player.
        if(this.playerMap[id] != this.player){
            this.playerMap[id] =  new Player(this, x, y, health, name);
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