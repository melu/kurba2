import 'phaser';
import GameScene from './scenes/GameScene.js';
import BootScene from './scenes/BootScene.js';
import NameScene from './scenes/NameScene.js';

const config = {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
    height: 600,
    // physics: {
    //     default: 'arcade',
    // },
    // pixelArt: true,
    // scene: Game,
    fps: {
        target: 15,
        },
    scene: [
        // BootScene,
        // TitleScene,
        BootScene,
        NameScene,
        GameScene
    ]
}
var game = new Phaser.Game(config);