export default class Player {
    constructor(id, playerName, x, y) {
        this.id =  id;
        this.name =  playerName || 'player'+id;
        this.x =  x;
        this.y =  y;
        this.velocity = 10;
        this.size = 32;
        this.health = 100;
        this.stun =  false;
        this._moveUp = false;
        this._moveDown = false;
        this._moveLeft = false;
        this._moveRight = false;
    }

    restart(x,y) {
        this.x =  x;
        this.y =  y;
        this.health = 100;
        this.stun =  false;
    }

    updatePosition() {
        // if the player is dead we stun him
        if(this.health <= 0) {
            this.stun = true;
        }

        if(!this.stun) {

            if(this._moveUp) this.y -= this.velocity;
            if(this._moveDown) this.y += this.velocity;
            if(this._moveLeft) this.x -= this.velocity;
            if(this._moveRight) this.x += this.velocity;
            
            this._moveUp = false;
            this._moveDown = false;
            this._moveLeft = false;
            this._moveRight = false;
        }
    }
}