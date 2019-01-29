export default class TextDamage {
    constructor(scene, x, y, damage){

        this.input = scene.add.bitmapText(x, y - 10, 'carrier_command', damage, 10);
        this.frames = 60;
        this.time = Date.now();
        this.remove = false;
    }

    updateState() {
        var actual = Date.now();
        if((actual - this.time) < 500){
            this.input.y--;
        } else {
            this.remove = true;
        }
    }

    destroy() {
        this.input.destroy();
    }
}