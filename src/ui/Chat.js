export default class ChatPanel {
    

    constructor (scene, client) {
        this.scene = scene;
        this.client = client;

        this.messages = [];

        var height = 150;
        var width = 300;
        var colorBg = 0xffff00;

        this.bg = scene.add.rectangle(0, scene.sys.game.config.height ,width, height , colorBg);
        this.bg.setOrigin(0 , 1);
        this.bg.setAlpha(0);
        this.bg.setScrollFactor(0);

        this.textEntry = scene.add.bitmapText(0, scene.sys.game.config.height, 'carrier_command', "", 10);
        this.textEntry.setOrigin(0 , 1);
        this.textEntry.setScrollFactor(0);
        //this.textEntry.setAlpha(0.5);

        this.active = false;
        this.textToSend;
        
        console.log("prueba)")
        var self = this;
        this.scene.input.keyboard.on('keydown', this.keyPress, self);
        
    }

    activate() {
        this.active = true;
        this.bg.setAlpha(0.1);
    }

    desactivate() {
        this.textEntry.text = "";
        this.active = false;
        this.bg.setAlpha(0);
    }

    keyPress(event) {
        if(this.active) {

            //console.log(event)
            // tecla de borrar
            if (event.keyCode === 8 && this.textEntry.text.length > 0)
            {
                this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
            {
                this.textEntry.text += event.key;
            }
            
            if(event.keyCode == 13) {
                this.client.chat(this.textEntry.text);
                this.desactivate();
            }
        } else if(event.keyCode == 13) {
            this.activate()
            
        }
    }

    receiveMessage(name, message) {
        var messageObject = this.scene.add.bitmapText(0, this.scene.sys.game.config.height, 'carrier_command', name +":"+message , 10);
        messageObject.setOrigin(0 , 1);
        messageObject.setScrollFactor(0);

        this.messages.push(messageObject)

        if(this.messages.length > 10){
            this.messages.shift();
        }

        for(var i = 0; i < this.messages.length; i++){
            this.messages[i].y -= 12
        }
    }

}