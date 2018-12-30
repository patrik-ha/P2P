var peer = new Peer();

peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
});
var peer;
var conn;

//recieves connection
peer.on("connection", function (new_conn) {
    conn = new_conn
    conn.on("data", function (data) {
        console.log('Received', data);
    });
});

function connect() {
    var target = $("#target-id").first().val();
    conn = peer.connect(target);
    conn.on("open", function (data) {
        console.log(data);
        conn.send("Test test 123");
    });
}

function send() {
    if (peer == null || conn == null) {
        return;
    }
    var message = $("#message").first().val();
    conn.send("")
}