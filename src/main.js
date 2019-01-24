import 'phaser';
import GameScene from './scenes/GameScene.js';

const config = {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
    height: 600,
    // physics: {
    //     default: 'arcade',
    // },
    // pixelArt: true,
    // scene: Game
    scene: [
        // BootScene,
        // TitleScene,
        GameScene
    ]
}
var game = new Phaser.Game(config);