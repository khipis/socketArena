var player = {
    init: function () {
        this.x = 10;
        this.y = 6;
        this.direction = 0;
        this.angle = 0;
        this.speed = 0;
        this.movementSpeed = 0.1;
        this.turnSpeed = 4 * Math.PI / 180;
        this.move = function () {
            var moveStep = this.speed * this.movementSpeed;
            this.angle += this.direction * this.turnSpeed;
            var newX = this.x + Math.cos(this.angle) * moveStep;
            var newY = this.y + Math.sin(this.angle) * moveStep;
            if (!containsBlock(newX, newY)) {
                this.x = newX;
                this.y = newY;
            }
        };
        this.draw = function () {
            var playerXOnMinimap = this.x * minimap.cellWidth;
            var playerYOnMinimap = this.y * minimap.cellHeight;
            minimap.context.fillStyle = "#000000";
            minimap.context.beginPath();
            minimap.context.arc(minimap.cellWidth * this.x, minimap.cellHeight * this.y,
                                minimap.cellWidth / 2, 0, 2 * Math.PI, true);
            minimap.context.fill();
            var projectedX = this.x + Math.cos(this.angle);
            var projectedY = this.y + Math.sin(this.angle);
            minimap.context.fillRect(minimap.cellWidth * projectedX - minimap.cellWidth / 4,
                                     minimap.cellHeight * projectedY - minimap.cellHeight / 4,
                                     minimap.cellWidth / 2, minimap.cellHeight / 2);
        };


        function containsBlock(x, y) {
            return (map[Math.floor(y)][Math.floor(x)] !== -1);
        };
    }
};
