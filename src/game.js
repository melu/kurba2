import 'phaser';
import Client from './Client';
import Player from './Player';
// import './Client';

var Game = new Phaser.Scene();

var player;
var upKey;
var downKey;
var leftKey;
var rightKey;
var wKey;
var sKey;
var aKey;
var dKey;

Game.init = function(){
    // game.stage.disableVisibilityChange = true;
}

Game.preload = function() {
    // this.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemapTiledJSON({
        key: 'map',
        url: 'assets/map/example_map.json'
    });
    this.load.spritesheet('tileset', 'assets/map/tilesheet.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('onyx', 'assets/sprites/qgzlX80.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.image('red', 'assets/sprites/red.png');
    this.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
};

Game.create = function(){
    Game.playerMap = {};
    Game.objectList = [];

    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    // var layer = map.createStaticLayer('Tile Layer', tiles);
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createStaticLayer(i, tiles);
    }
    //layer.inputEnabled = true; // Allows clicking on the map
    upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.anims.create({ key:'up', frames: this.anims.generateFrameNumbers('onyx', { frames: [114, 113, 112] }), frameRate: 30, repeat: false});
    this.anims.create({ key:'down', frames: this.anims.generateFrameNumbers('onyx', { frames: [57, 58, 60] }), frameRate: 30, repeat: false});
    this.anims.create({ key:'right', frames: this.anims.generateFrameNumbers('onyx', { frames: [0, 1] }), frameRate: 30, repeat: false});

    client.askNewPlayer();
};

Game.updateState = function(pack){
    for(var playerIndex in pack.players){
        var player = pack.players[playerIndex];
        Game.updatePlayer(player);
    }

    for(var objectIndex in pack.objects){
        var object = pack.objects[objectIndex];
        if(!Game.objectList[object.id] && !object.destroy){
            Game.addObject(object.id, object.x, object.y);
        }else{
            if(object.destroy){
                Game.removeObject(object.id);
            }else{
                Game.objectList[object.id].x = object.x;
                Game.objectList[object.id].y = object.y;
            }
        }
    }
}

Game.gameOverPopup = function () {

}

Game.updatePlayer = function(newPlayerState){
    if(Game.playerMap && Game.playerMap[newPlayerState.id]){
        var player = Game.playerMap[newPlayerState.id];
        
        //left
        if(player.x>newPlayerState.x){
            player.anims.play('right');
            player.scaleX = -1;
        }
        
        //right
        if(player.x<newPlayerState.x){
            player.anims.play('right');
            player.scaleX = 1;
        }
        
        //down
        if(player.y<newPlayerState.y){
            player.anims.play('down');
            player.scaleX = 1;
        }
        
        //up
        if(player.y>newPlayerState.y){
            player.anims.play('up');
            player.scaleX = 1;
        }

        if(newPlayerState.health <= 0){
            player.tint = "#808080";
        }

        player.x = newPlayerState.x;
        player.y = newPlayerState.y;
        player.health = newPlayerState.health;

        var porcentaje = player.health > 0 ? player.health : 0;
        if(player.barraVida){
            // console.log(player.barraVida)
            player.barraVida.x = player.x;
            player.barraVida.y = player.y - 20;
            // player.barraVida.setPosition(player.x, player.y);
            player.barraVida.width = porcentaje;
            
        }
        
        if(player.barraVidaRestante){
            // player.barraVidaRestante.x = player.x + (porcentaje/2);
            // player.barraVidaRestante.y = player.y - 20;
            player.barraVidaRestante.setPosition(player.x + porcentaje, player.y - 20);
            player.barraVidaRestante.width = 100 - porcentaje;   
        }

        if(player.nombre){
            player.nombre.x = player.x - (player.nombre.width /2);
            player.nombre.y = player.y - 40;
        }
    }
}

// player input
Game.update = function(){
    if (upKey.isDown || wKey.isDown)
    {
        client.moveUp();
    }
    else if (downKey.isDown || sKey.isDown)
    {
        client.moveDown();
    }

    if (leftKey.isDown || aKey.isDown)
    {
        client.moveLeft();
    }
    else if (rightKey.isDown || dKey.isDown)
    {
        client.moveRight();
    }
}

Game.addPlayer = function(id, x , y, health, name){
    //add our player and set the camera
    Game.playerMap[id] = this.add.sprite(x,y,'onyx');
    // Game.playerMap[id] = new Player(this, x, y);
    // Game.playerMap[id].setOrigin(.5);
    Game.playerMap[id].anims.load('right');
    Game.playerMap[id].anims.load('down');
    Game.playerMap[id].anims.load('up');

    Game.player = Game.playerMap[id];

    // this.physics.add.existing(Game.player);

    Game.playerMap[id].health = health;
    Game.playerMap[id].name = name;
    console.log(Game.player);

    // this.cameras.main.height = 600;
    // this.cameras.main.width = 600;
    // this.cameras.main.setBounds(0,0,600,600);
    this.cameras.main.setSize(600,600);
    this.cameras.main.startFollow(Game.player, true, 0.05, 0.05);
    // game.camera.follow(Game.player, Phaser.Camera.FOLLOW_TOPDOWN, 0.5, 0.5);
    // futuro calculo en proporcion de la vida
    var porcentaje = 100;
    // Game.playerMap[id].barraVida = Game.crearBarraVida(x,y,porcentaje, false);
    Game.playerMap[id].nombre = Game.crearNombre(x,y-20, name);
    Game.playerMap[id].barraVida = Game.crearBarraVida(x,y, porcentaje, false);
    Game.playerMap[id].barraVidaRestante = Game.crearBarraVida(x+porcentaje,y,100, true);

    this.input.on('pointerdown', function(pointer){
        console.log(pointer);
        console.log(pointer.worldX)
        console.log(pointer.worldY)
        client.shoot({x:pointer.worldX, y:pointer.worldY});
    }, this);
}

Game.crearBarraVida = function(x, y, health, danio) {
    var rect;
    var width = health // example;
    var height = 5 // example;
    // var bmd = this.add.bitmapData(width, height);
    // bmd.ctx.beginPath();
    // bmd.ctx.rect(0, 0, width, height);
    // bmd.ctx.fillStyle = (danio)?'#FF0000':'#00FF00';
    // bmd.ctx.fill();
    var color = (danio)?0xFF0000:0x00FF00;

    // rect = new Phaser.Geom.Rectangle(0, 0, width, height)
    // var graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
    // graphics.fillRectShape(rect);

    rect = this.add.rectangle(x,y,width,height, color);
    return rect;
}

Game.crearNombre = function(x , y, nombre) {
    var bmpText = this.add.bitmapText(x, y, 'carrier_command', nombre, 10);
    // bmpText.setOrigin(0,0);
    return bmpText;
}

Game.addNewPlayer = function(id, x, y, health, name){
    //we add a player if it isn't our player.
    if(Game.playerMap[id] != Game.player){
        Game.playerMap[id] = this.add.sprite(x,y,'onyx');
        // Game.playerMap[id].setOrigin(.5);
        Game.playerMap[id].anims.load('right');
        Game.playerMap[id].anims.load('down');
        Game.playerMap[id].anims.load('up');
        var porcentaje = 100;
        // Game.playerMap[id].barraVida = Game.crearBarraVida(x,y,porcentaje, false);
        Game.playerMap[id].barraVida = Game.crearBarraVida(x,y,porcentaje, false);
        Game.playerMap[id].barraVidaRestante = Game.crearBarraVida(x+porcentaje,y,100, true);
        Game.playerMap[id].nombre = Game.crearNombre(x,y-20, name);

        Game.playerMap[id].health = health;
        Game.playerMap[id].name = name;
    }
};

Game.addObject = function(id, x, y){
    Game.objectList[id] = this.add.sprite(x,y,'red');
    // emitter = game.add.emitter(x, y, 200);
    // emitter.setScale(0,0);
    // emitter.gravity = 0;
    // emitter.makeParticles('red');
    // emitter.start(false, 1000, 10);
    // Game.objectList[id] = emitter;

    Game.objectList[id].displayWidth=40;
    Game.objectList[id].displayHeight=40;
    // Game.objectList[id].setSize(5,5);
    // Game.objectList[id].setOrigin(.5);
}

Game.removePlayer = function(id){
    //we remove a player
    if(Game.playerMap[id].barraVida) Game.playerMap[id].barraVida.destroy();
    if(Game.playerMap[id].barraVidaRestante) Game.playerMap[id].barraVidaRestante.destroy();
    if(Game.playerMap[id].nombre) Game.playerMap[id].nombre.destroy();

    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
}

Game.removeObject = function(id){
    Game.objectList[id].destroy();
    delete Game.objectList[id];
}

Game.disableVisibilityChange = true;


const config = {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
    height: 600,
    // physics: {
    //     default: 'arcade',
    // },
    scene: Game
	// scene: {
	// 	preload: preload,
	// 	create: create
	// }
}

var client = new Client(Game);
// var game = new Phaser.Game(600, 600, Phaser.AUTO, document.getElementById("game"));
var game = new Phaser.Game(config);
// game.physics.startSystem(Phaser.Physics.P2JS);
// game.world.setBounds(0, 0, 1920, 1920);
// game.state.add('Game', Game);
// game.state.start('Game');
