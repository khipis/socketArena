var enemy = {
    init: function () {
        this.sprite =
            new jaws.Sprite({
                image: "./assets/sprites/enemy.png",
                x: 0,
                y: canvas.height / 2,
                anchor: "center"
            });
        this.x = 12;
        this.y = 5;
        this.show = false;
        this.distance = 10000;
        this.draw = function () {
            this.scale = raycaster.maxDistance / enemy.distance / 4;
            this.sprite.scaleTo(this.scale);
            this.angle %= twoPi;
            if (this.angle < 0) {
                this.angle += twoPi;
            }
            this.angleInDegrees = this.angle * 180 / Math.PI;
            var potentialWidth = 300 * .2;
            var halfAngularWidth = potentialWidth / 2;
            this.adjustedAngle = this.angleInDegrees + halfAngularWidth;
            if (this.adjustedAngle > 180 || this.adjustedAngle < -180) {
                this.adjustedAngle %= 180;
            }

            this.sprite.x = this.adjustedAngle / potentialWidth * canvas.width;
            this.sprite.draw();
        };
    }
};