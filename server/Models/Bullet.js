export default class Bullet {

    constructor(id, ownerId, x, y, angle){
        this.id = id;
        this.ownerId = ownerId;
        this.x =  x;
        this.y =  y;
        this.size = 5;
        this.damage =  10;
        this.timer = 0;
        this.destroy = false;
        this.speed = 5;

        this.setVelocity(angle);
    }

    setVelocity(angle){
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
    }

    updatePosition(playerList){
        if(!this.destroy) {                    
            this.x+=this.vx;
            this.y+=this.vy;
            this.timer++;
            if(this.timer>100){
                this.destroy = true;
            }

            var playerCollision = this.collideWithPlayer(playerList);
            if(playerCollision) {
                playerCollision.health -= this.damage;

                // if this collision kills someone it gives score to the player
                if(playerCollision.health <= 0){
                    playerList[this.ownerId].score++;
                }
                this.destroy = true;
            }
        }
    }

    collideWithPlayer(playerList) {
        var playerCollision = null;
        for(var socketId in playerList){
            var player = playerList[socketId];
            if(player && player.health > 0 
                && this.ownerId !== player.id
                && !player._dashing){
    
                var rect1 = {
                    x: player.x - player.size,
                    y: player.y - player.size,
                    height: player.size * 2,
                    width: player.size * 2
                };
                var rect2 = {
                    x: this.x - this.size,
                    y: this.y - this.size,
                    height: this.size * 2,
                    width: this.size * 2
                };
    
                    if (rect1.x < rect2.x + rect2.width &&
                            rect1.x + rect1.width > rect2.x &&
                            rect1.y < rect2.y + rect2.height &&
                            rect1.height + rect1.y > rect2.y){
                                playerCollision = player;
                                return player;
                            }
            }
        };
        return playerCollision;
    }
}