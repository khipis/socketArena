var gameWebsocket = new WebSocket('ws://' + location.hostname + ':' + location.port + '/arena');

gameWebsocket.onmessage = function (msg) {

};


var Game = function () {

    this.draw = function () {
        minimap.draw();
        player.draw();
        canvas.blank();
        for (var i = 0; i < backgroundSlivers.length; i++) {
            canvas.drawSliver.apply(canvas, backgroundSlivers[i]);
        }

        if (enemy.show) {
            enemy.draw();
        }

        for (var i = 0; i < foregroundSlivers.length; i++) {
            canvas.drawSliver.apply(canvas, foregroundSlivers[i]);
        }

    };
    this.setup = function () {
        gun.init();
        minimap.init();
        player.init();
        raycaster.init();
        canvas.init();
        palette.init();
        enemy.init();
    };

    this.update = function () {
        raycaster.castRays();
        if (jaws.pressed("a")) {
            player.direction = -0.3;
        }

        if (jaws.pressed("d")) {
            player.direction = 0.3;
        }

        if (jaws.pressed("w")) {
            player.speed = 1;
            gameWebsocket.send(player.x + ':' + player.y);
        }

        if (jaws.pressed("s")) {
            player.speed = -1;
            gameWebsocket.send(player.x + ':' + player.y);
        }
        
        if (jaws.on_keyup(["a", "d"], function () {
                player.direction = 0;
            })) {

        }
        if (jaws.on_keyup(["w", "s"], function () {
                player.speed = 0;
            })) {

        }
        if (jaws.pressed("space")) {
            gun.fire();
        }

        player.move();
    };
};



