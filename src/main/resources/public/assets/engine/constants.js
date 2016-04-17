var twoPi = Math.PI * 2;

var palette = {
    init: function () {
        this.ground = '#1A1A1A';
        this.sky = '#030739';
        this.shades = 300;
        var initialWallColors = [[85, 68, 102],
            [255, 255, 255],
            [255, 201, 52],
            [118, 150, 159]];
        this.walls = [];
        for (var i = 0; i < initialWallColors.length; i++) {
            this.walls[i] = [];
            for (var j = 0; j < this.shades; j++) {
                var red = Math.round(initialWallColors[i][0] * j / this.shades);
                var green = Math.round(initialWallColors[i][1] * j / this.shades);
                var blue = Math.round(initialWallColors[i][2] * j / this.shades);
                var color = "rgb(" + red + "," + green + "," + blue + ")";
                this.walls[i].push(color);
            }

        }

    }
};

var canvas = {
    init: function () {
        this.element = document.getElementById('canvas');
        this.context = this.element.getContext("2d");
        this.width = this.element.width;
        this.height = this.element.height;
        this.halfHeight = this.height / 2;
        this.blank = function () {
            this.context.clearRect(0, 0, this.width, this.height);
            this.context.fillStyle = palette.sky;
            this.context.fillRect(0, 0, this.width, this.halfHeight);
            this.context.fillStyle = palette.ground;
            this.context.fillRect(0, this.halfHeight, this.width, this.height);
        }
        this.drawSliver = function (sliver, wallTop, wallBottom, color) {
            this.context.beginPath();
            this.context.strokeStyle = color;
            this.context.moveTo(sliver + .5, wallTop);
            this.context.lineTo(sliver + .5, wallBottom);
            this.context.closePath();
            this.context.stroke();
        }
    }
};