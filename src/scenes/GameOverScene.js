import Button from "../ui/Button";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameOverScene'
        });

        this.bg;
        this.buttonRestart;
        this.logo;
    }

    init(data) {
        this.restartPushed = data.restartPushed;
    }
    
    preload() {
        
    }
    
    create() {
        var centerY = this.sys.game.config.height / 2;
        var marginX = this.sys.game.config.width/2;
        var height = centerY;
        var width = marginX;
        var colorBg = 0xffff00;
        this.bg = this.add.rectangle(marginX/2, centerY / 2 ,width, height , colorBg);
        this.bg.setOrigin(0,0);
        this.bg.setAlpha(0.5);
        this.logo = this.add.bitmapText(marginX, centerY - 100, 'carrier_command', "GAME OVER", 30);
        this.logo.setOrigin(0,0);
        this.logo.x = this.logo.x - this.logo.width/2;

        this.buttonRestart = new Button(this, marginX, centerY, "Play again");

        var self = this;
        this.buttonRestart.on('pointerdown', function(){
            self.restartPushed();
        })
    }

    update() {

    }
}