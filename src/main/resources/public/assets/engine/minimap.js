var minimap = {
    init: function () {
        this.element = document.getElementById('minimap');
        this.context = this.element.getContext("2d");
        this.element.width = 300;
        this.element.height = 300;
        this.width = this.element.width;
        this.height = this.element.height;
        this.cellsAcross = map[0].length;
        this.cellsDown = map.length;
        this.cellWidth = this.width / this.cellsAcross;
        this.cellHeight = this.height / this.cellsDown;
        this.colors = ["#ffff00", "#ff00ff", "#00ffff", "#0000ff"];
        this.draw = function () {
            for (var y = 0; y < this.cellsDown; y++) {
                for (var x = 0; x < this.cellsAcross; x++) {
                    var cell = map[y][x];
                    if (cell === -1) {
                        this.context.fillStyle = "#ffffff"
                    } else {
                        this.context.fillStyle = this.colors[map[y][x]];
                    }

                    this.context.fillRect(this.cellWidth * x, this.cellHeight * y,
                                          this.cellWidth, this.cellHeight);
                }

            }

            for (var i = 0; i < this.rays.length; i++) {
                this.drawRay(this.rays[i][0], this.rays[i][1])
            }
        };
        this.drawRay = function (xHit, yHit) {
            this.context.beginPath();
            this.context.moveTo(this.cellWidth * player.x, this.cellHeight * player.y);
            this.context.lineTo(xHit * this.cellWidth, yHit * this.cellHeight);
            this.context.closePath();
            this.context.stroke();
        };
    }
};
