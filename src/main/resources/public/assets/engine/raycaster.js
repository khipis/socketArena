var raycaster = {
    init: function () {
        this.maxDistance =
            Math.sqrt(minimap.cellsAcross * minimap.cellsAcross + minimap.cellsDown
                                                                  * minimap.cellsDown);
        var numberOfRays = 300;
        var angleBetweenRays = .2 * Math.PI / 180;
        this.castRays = function () {
            foregroundSlivers = [];
            backgroundSlivers = [];
            minimap.rays = [];
            enemy.show = false;
            for (var i = 0; i < numberOfRays; i++) {
                var rayNumber = -numberOfRays / 2 + i;
                var rayAngle = angleBetweenRays * rayNumber + player.angle;
                this.castRay(rayAngle, i);
            }
        }
        this.castRay = function (rayAngle, i) {
            rayAngle %= twoPi;
            if (rayAngle < 0) {
                rayAngle += twoPi;
            }
            var right = (rayAngle > twoPi * 0.75 || rayAngle < twoPi * 0.25);
            var up = rayAngle > Math.PI;
            var slope = Math.tan(rayAngle);
            var distance = 0;
            var xHit = 0;
            var yHit = 0;
            var wallX;
            var wallY;
            var dX = right ? 1 : -1;
            var dY = dX * slope;
            var x = right ? Math.ceil(player.x) : Math.floor(player.x);
            var y = player.y + (x - player.x) * slope;
            var wallType;
            while (x >= 0 && x < minimap.cellsAcross && y >= 0 && y < minimap.cellsDown) {
                wallX = Math.floor(x + (right ? 0 : -1));
                wallY = Math.floor(y);
                if (map[wallY][wallX] > -1) {
                    var distanceX = x - player.x;
                    var distanceY = y - player.y;
                    distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                    xHit = x;
                    yHit = y;
                    wallType = map[wallY][wallX];
                    break;
                } else {
                    if (enemy.x === wallX && enemy.y === wallY) {
                        enemy.show = true;
                    }

                }
                x += dX;
                y += dY;
            }
            slope = 1 / slope;
            dY = up ? -1 : 1;
            dX = dY * slope;
            y = up ? Math.floor(player.y) : Math.ceil(player.y);
            x = player.x + (y - player.y) * slope;
            while (x >= 0 && x < minimap.cellsAcross && y >= 0 && y < minimap.cellsDown) {
                wallY = Math.floor(y + (up ? -1 : 0));
                wallX = Math.floor(x);
                if (map[wallY][wallX] > -1) {
                    var distanceX = x - player.x;
                    var distanceY = y - player.y;
                    var blockDistance = Math.sqrt(
                        distanceX * distanceX + distanceY * distanceY);
                    if (!distance || blockDistance < distance) {
                        distance = blockDistance;
                        xHit = x;
                        yHit = y;
                        wallType = map[wallY][wallX];
                    }
                    break;
                } else {
                    if (enemy.x === wallX && enemy.y === wallY) {
                        enemy.show = true;
                    }

                }
                x += dX;
                y += dY;
            }
            if (enemy.show === true) {
                var enemyDistanceX = enemy.x + .5 - player.x;
                var enemyDistanceY = enemy.y + .5 - player.y;
                enemy.angle = Math.atan(enemyDistanceY / enemyDistanceX) - player.angle;
                enemy.distance =
                    Math.sqrt(
                        enemyDistanceX * enemyDistanceX + enemyDistanceY * enemyDistanceY);
            }
            
            minimap.rays.push([xHit, yHit]);
            var adjustedDistance = Math.cos(rayAngle - player.angle) * distance;
            var wallHalfHeight = canvas.height / adjustedDistance / 2;
            var wallTop = Math.max(0, canvas.halfHeight - wallHalfHeight);
            var wallBottom = Math.min(canvas.height, canvas.halfHeight + wallHalfHeight);
            var percentageDistance = adjustedDistance / this.maxDistance;
            var brightness = 1 - percentageDistance;
            var shade = Math.floor(palette.shades * brightness);
            var color = palette.walls[wallType][shade];
            if (adjustedDistance < enemy.distance) {
                foregroundSlivers.push([i, wallTop, wallBottom, color]);
            } else {
                backgroundSlivers.push([i, wallTop, wallBottom, color]);
            }
        }
    }
};