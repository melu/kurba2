export default class Bullet {
    constructor(id, ownerId, x, y, velocityX, velocityY){
        this.id = id;
        this.ownerId = ownerId;
        this.x =  x;
        this.y =  y;
        this.size = 5;
        this.vx = velocityX;
        this.vy = velocityY;
        this.damage =  10;
        this.timer = 0;
        this.destroy = false;
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
                this.destroy = true;
            }
        }
    }

    collideWithPlayer(playerList) {
        var playerCollision = null;
        for(var socketId in playerList){
            var player = playerList[socketId];
            if(player && player.health > 0 && this.ownerId !== player.id){
    
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