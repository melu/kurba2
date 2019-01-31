class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }

    preload() {
        // const max = this.add.rectangle(0, this.sys.game.config.height / 2, this.sys.game.config.width * 100, 60, 0x000000);
        const progress = this.add.rectangle(0, this.sys.game.config.height / 2, this.sys.game.config.width * 0, 60, 0xffffff);

        // Register a load progress event to show a load bar
        this.load.on('progress', (value) => {
            // progress.clear();
            // progress.fillStyle(0xffffff, 1);
            // progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
            progress.width = this.sys.game.config.width * value;
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('NameScene');
        });

        this.load.tilemapTiledJSON({
            key: 'map',
            url: 'assets/map/example_map.json'
        });
        this.load.spritesheet('tileset', 'assets/map/tilesheet.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('onyx', 'assets/sprites/qgzlX80.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.image('red', 'assets/sprites/red.png');
        this.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
        this.load.atlasXML('ui', 'assets/ui/redSheet.png', 'assets/ui/redSheet.xml');
    }

}

export default BootScene;