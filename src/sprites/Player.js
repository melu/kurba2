export default class Player extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, health, name, id)
    {
        super(scene, x, y, 'onyx');
        scene.add.existing(this);

        this.anims.load('right');
        this.anims.load('down');
        this.anims.load('up');
        // this.setTexture('onyx');
        // this.setPosition(x, y);
        // this.playerMap[id].barraVida = this.crearBarraVida(x,y,porcentaje, false);
        this.barraVida = this.crearBarraVida(scene, 100, false);
        this.barraVidaRestante = this.crearBarraVida(scene, 100, true);
        this.nombre = this.crearNombre(scene, name);

        this.health = health;
        this.name = name;
        this.id = id;
    }

    crearBarraVida(scene, width, danio) {
        var height = 5 // example;
        var color = (danio)?0xFF0000:0x00FF00;    
        var rect = scene.add.rectangle(this.x, this.y,width,height, color);
        return rect;
    }
    
    crearNombre(scene, nombre) {
        var bmpText = scene.add.bitmapText(this.x, this.y, 'carrier_command', nombre, 10);
        return bmpText;
    }

    updateState(newPlayerState) {
        //left
        if(this.x>newPlayerState.x){
            this.anims.play('right');
            this.flipX = true;
        }
        
        //right
        if(this.x<newPlayerState.x){
            this.anims.play('right');
            this.flipX = false;
        }
        
        //down
        if(this.y<newPlayerState.y){
            this.anims.play('down');
            this.flipX = false;
        }
        
        //up
        if(this.y>newPlayerState.y){
            this.anims.play('up');
            this.flipX = false;
        }

        if(newPlayerState.health <= 0){
            this.tint = "#808080";
        } else if(this.isTinted) {
            this.tint = 0xffffff;
        }

        this.x = newPlayerState.x;
        this.y = newPlayerState.y;
        this.health = newPlayerState.health;

        var porcentaje = this.health > 0 ? this.health : 0;
        if(this.barraVida){
            this.barraVida.setPosition(this.x, this.y - 20);
            this.barraVida.width = porcentaje;
        }
        
        if(this.barraVidaRestante){
            this.barraVidaRestante.setPosition(this.x + porcentaje, this.y - 20);
            this.barraVidaRestante.width = 100 - porcentaje;   
        }

        if(this.nombre){
            this.nombre.x = this.x - (this.nombre.width /2);
            this.nombre.y = this.y - 40;
        }
    }

    destroy() {
        //we remove a player
        if(this.barraVida) this.barraVida.destroy();
        if(this.barraVidaRestante) this.barraVidaRestante.destroy();
        if(this.nombre) this.nombre.destroy();
        super.destroy();
    }

    // preUpdate (time, delta)
    // {
    //     super.preUpdate(time, delta);
    // }
}