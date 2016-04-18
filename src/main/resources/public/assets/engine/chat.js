var chatWebsocket = new WebSocket('ws://' + location.hostname + ':' + location.port + '/chat');
chatWebsocket.onmessage = function (msg) {
    updateChat(msg);
    var data = JSON.parse(msg.data);
    var positionXY = data.position;

    var positions = positionXY.split(":");

    enemy.x = parseInt(positions[0]);
    enemy.y = parseInt(positions[1]);

};
chatWebsocket.onclose = function () {
    console.log('WebSocket connection closed');
};

document.getElementById('message').addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    if (message !== '') {
        chatWebsocket.send(message);
        document.getElementById('message').value = '';
    }
}

function updateChat(msg) {
    var data = JSON.parse(msg.data);
    insert('chat', data.userMessage);
    document.getElementById('userlist').innerHTML = '';
    data.userlist.forEach(function (user) {
        insert('userlist', '' + user);
    });
}

function insert(targetId, message) {
    document.getElementById(targetId).insertAdjacentHTML('afterbegin', message);
}
