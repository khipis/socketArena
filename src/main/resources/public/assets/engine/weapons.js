var gun = {
    init: function () {
        this.context = document.getElementById('screenshot').getContext('2d');
        var filtered = false;
        var f;
        this.fire = function () {
            var image = new Image();
            image.src = canvas.element.toDataURL('image/png');
            image.onload = function () {
                gun.context.drawImage(image, 0, 0);
            }
            filtered = false;
        }
    }
};