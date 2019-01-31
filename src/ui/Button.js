export default class Button extends Phaser.GameObjects.Image{
    constructor(scene, x, y, text){
        super(scene, x, y, 'ui', 'red_button01.png');
        scene.add.existing(this);
        // let btn = scene.add.image(x, y, 'ui', 'red_button01.png').setOrigin(0);
        // this.setTexture('ui','red_button01.png')
        // this.setOrigin(0,0);
        this.setPosition(x,y);
        this.setInteractive();

        this.bmText = scene.add.bitmapText(x, y - 10, 'carrier_command', text, 15);
        this.bmText.setOrigin(0,0)
        this.bmText.x = this.x - (this.bmText.width / 2);
        // scene.add.existing(bmText);
        this.active = false;


        this.on('pointerover', function () {

            // this.setTint("0xffcba8");
            // this.brighten(50);

        });

        this.on('pointerout', function () {
            this.setFrame("red_button01.png");
        });

        // this.on('pointerup', function () {

        //     this.setFrame("red_button00.png");

        // }, this);

        this.on('pointerdown', function () {

            this.setFrame("red_button00.png");

        }, this);
    }
}