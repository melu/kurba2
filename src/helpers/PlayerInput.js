
export default class PlayerInput {
    constructor(scene, client) {
        this.client = client;

        this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        scene.input.on('pointerdown', function(pointer){
            this.client.shoot({x:pointer.worldX, y:pointer.worldY});
        }, this);
    }

    // this method will be called on every update loop checking the input for calling the client 
    checkInput() {
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
    }
}