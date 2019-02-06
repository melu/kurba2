
export default class PlayerInput {
    constructor(scene, client) {
        this._chatActive = false;
        this.client = client;
        this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.enterKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.pointer = scene.input.mousePointer;

        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        scene.input.on('pointerdown', function(pointer){
            if(this._chatActive) {
                this.desactiveChat();
            }
            this.client.shoot({x:pointer.worldX, y:pointer.worldY});
        }, this);


        // when the input is active, show the chat
        this.gc = document.getElementById("game-chat");
        this.gc.hidden = false;

        this.chatInput = document.getElementById("chat-input");
        this.desactiveChat();
        var self = this;
        // this.chatInput.addEventListener('focusin', function() { self.activeChat() });
        this.chatInput.addEventListener('focusout', function() { self.desactiveChat() });
        this.chatInput.addEventListener('keyup', function(ev) { self.handleChatInput(ev) });
    }

    activeChat(){
        this._chatActive = true;
        this.gc.opacity = 1;
        this.chatInput.hidden= false;
        this.chatInput.focus();
    }

    desactiveChat(){
        this._chatActive = false;
        this.gc.opacity = 0.2;
        this.chatInput.hidden= true;
        this.chatInput.blur();
    }

    handleChatInput(ev){
        if(this._chatActive){
            if(ev.keyCode == 13) {
                if(this.chatInput.value !== ''){
                    this.client.chat(this.chatInput.value)
                    this.chatInput.value = "";
                }
                this.desactiveChat();
            }
        }
        console.log(ev);
    }

    // this method will be called on every update loop checking the input for calling the client 
    checkInput() {
        if(!this._chatActive){
            if (this.upKey.isDown || this.wKey.isDown)
            {
                this.client.moveUp();
            }
            else if (this.downKey.isDown || this.sKey.isDown)
            {
                this.client.moveDown();
            }
        
            if (this.leftKey.isDown || this.aKey.isDown)
            {
                this.client.moveLeft();
            }
            else if (this.rightKey.isDown || this.dKey.isDown)
            {
                this.client.moveRight();
            }
    
            if(this.spaceKey.isDown){
                this.client.dash({x:this.pointer.worldX, y:this.pointer.worldY});
            }

            if(this.enterKey.isDown){
                this.activeChat();
            }
        }
    }
}