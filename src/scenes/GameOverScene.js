import Button from "../ui/Button";

export default class GameOverScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameOverScene'
        });

        this.buttonRestart;
        this.logo;
    }

    preload() {
        
    }

    create() {
        var centerY = this.sys.game.config.height / 2;
        var marginX = this.sys.game.config.width/2;
        this.logo = this.add.bitmapText(marginX, centerY - 100, 'carrier_command', "GAME OVER", 30);
        this.logo.setOrigin(0,0);
        this.logo.x = this.logo.x - this.logo.width/2;

        this.buttonRestart = new Button(this, marginX, centerY, "Play again");
    }

    update() {

    }
}