import * as Constants from '../Constants';

export default class Player {
    constructor(id, playerName, x, y) {
        this.id =  id;
        this.setName(playerName);
        this.x =  x;
        this.y =  y;
        this.speed = 5;
        this.size = 32;
        this.health = 100;
        this.stun = false;
        this._moveUp = false;
        this._moveDown = false;
        this._moveLeft = false;
        this._moveRight = false;
        this._dashing = false;
        this.dashCount = 0;
        this.gcd = 0;
        this.score = 0;
    }

    setName(playerName){
        if(playerName){
            if(playerName.length <= Constants.MAX_NAME_LENGTH){
                this.name = playerName;
            }else {
                this.name = playerName.slice(0,Constants.MAX_NAME_LENGTH);
            }
        } else {
            this.name = 'player'+this.id;
        }
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

        if(this.gcd > 0){
            this.gcd--;
        }

        if(!this.stun) {

            if(this._dashing) {
                if(this._dashCount == 0){
                    this._dashing = false;
                    this._dashX = 0;
                    this._dashY = 0;
                }else {
                    this._dashCount--;
                    this.x += this._dashX;
                    this.y += this._dashY;
                }
            } else {
                if(this._moveUp) this.y -= this.speed;
                if(this._moveDown) this.y += this.speed;
                if(this._moveLeft) this.x -= this.speed;
                if(this._moveRight) this.x += this.speed;
            }
                
            this._moveUp = false;
            this._moveDown = false;
            this._moveLeft = false;
            this._moveRight = false;
        }
    }

    dash(pointer){
        if(this.gcd <= 0) {
            var angle = Math.atan2(pointer.y - this.y, pointer.x - this.x);
            this._dashing = true;
            this._dashX = (Math.cos(angle) * Constants.DASH_DISTANCE) / Constants.DASH_DURATION;
            this._dashY = (Math.sin(angle) * Constants.DASH_DISTANCE) / Constants.DASH_DURATION;
            this._dashCount = Constants.DASH_DURATION;
            this.gcd = Constants.GCD;
        }
    }
}