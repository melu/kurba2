
export default class Red extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'red');
        scene.add.existing(this);
        this.alpha = 0;
        this.particles = scene.add.particles('flares');
        var emiter = this.particles.createEmitter({
            frame: 'red',
            lifespan: 100,
            // speed: { min: 400, max: 600 },
            angle: 330,
            // gravityY: 300,
            scale: { start: 0.2, end: 0 },
            quantity: 2,
            blendMode: 'ADD',
            follow: this
        });

        // this.displayWidth=40;
        // this.displayHeight=40;
    }

    destroy() {
        this.particles.destroy();
        super.destroy();
    }

}