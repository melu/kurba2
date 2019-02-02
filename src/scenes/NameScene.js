class NameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'NameScene'
        });
    }

    create() {
        var centerY = this.sys.game.config.height / 2;
        var marginX = this.sys.game.config.width/4;


        this.playerName = "name";
        
        this.enterNameText = this.add.bitmapText(marginX, centerY - 100, 'carrier_command', "Enter name:", 30);
        this.enterNameText.setOrigin(0,0);
        this.bmpText = this.add.bitmapText(marginX, centerY - 40, 'carrier_command', this.playerName, 30);
        this.bmpText.setOrigin(0,0);
        var rect = this.add.rectangle(marginX, centerY, this.sys.game.config.width - (marginX*2), 20, 0xffffff);
        rect.setOrigin(0,0)

        this.input.keyboard.on('keyup', this.anyKey, this);
    }

    update() {
        this.bmpText.text = this.playerName;
    }

    anyKey (event)
    {
        //  Only allow A-Z . and 0-9

        let code = event.keyCode;
        if (code === Phaser.Input.Keyboard.KeyCodes.BACKSPACE || code === Phaser.Input.Keyboard.KeyCodes.DELETE)
        {
            this.playerName = this.playerName.slice(0, -1);
        } 
        else if (code === Phaser.Input.Keyboard.KeyCodes.ENTER)
        {
            this.scene.start('GameScene', {playerName: this.playerName});
        }
        else if (
            (code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z)
            || (code >= Phaser.Input.Keyboard.KeyCodes.ZERO && code <= Phaser.Input.Keyboard.KeyCodes.NINE) )
        {
            this.playerName = this.playerName + event.key;
            code -= 65;
        }
    }
}

export default NameScene;