var peer = new Peer();

peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
});
var peer;
var conn;

//recieves connection
peer.on("connection", function (new_conn) {
    conn = new_conn;
    console.log(new_conn);
    update_connected_to(new_conn.peer);
    conn.on("data", function (data) {
        show(data.message);
    });
});

function connect() {
    var target = $("#target-id").first().val();
    conn = peer.connect(target);
    conn.on("open", function () {
        update_connected_to(target);
        conn.on("data", function (data) {
            show(data.message);
        });
    });
}

function send() {
    if (peer == null || conn == null) {
        return;
    }
    var message = $("#message").first().val();
    conn.send({ test: 1, message: message });
}

function show(data) {
    console.log(data);
    $("#recieved-messages").first().innerHTML = data;
}

function update_connected_to(name) {
    $("#connected-to").first().text(name);
}