var peer = new Peer();
//might be able to find this on the "peer"-object
var ownId;
peer.on("open", function (id) {
    console.log("My peer ID is: " + id);
    ownId = id;
    updateOwnId(id);
});
var peer;
var conn;

//recieves connection
peer.on("connection", function (new_conn) {
    conn = new_conn;
    console.log(new_conn);
    updateConnectedTo(conn.peer);
    prepareMessaging();
    conn.on("data", function (data) {
        displayMessage(data.message, data.timestamp, conn.peer);
    });
});

//TODO: should set labels by hand (choose nicknames)
//TODO: should also get references to all html-elements once, and save these somewhere
function connect() {
    var target = $("#target-id").val();
    conn = peer.connect(target);
    conn.on("open", function () {
        updateConnectedTo(target);
        prepareMessaging();
        conn.on("data", function (data) {
            displayMessage(data.message, data.timestamp, conn.peer);
        });
        console.log(conn);
    });
}

//More here later
function prepareMessaging() {
    enableButtonGroup("connection-buttons", false);
    enableButtonGroup("messaging-buttons", true);
}

function send() {
    if (peer == null || conn == null) {
        return;
    }
    var message = $("#message").val();
    $("#message").val("");
    displayMessage(message, currentTimestamp(), ownId);
    conn.send({ test: 1, message: message, timestamp: currentTimestamp() });
}

// Could go in own file
function enableButtonGroup(name, state) {
    $("#" + name).prop("disabled", !state);
}


function displayMessage(text, timestamp, id) {
    $("#messages").append("<p><b>" + id + "</b>" + ": " + text + " - <i>" + timestamp + "</i></p>");
}

function updateConnectedTo(name) {
    $("#connected-to").text(name);
}

function updateOwnId(id) {
    $("#my-id").text(id);
}

function currentTimestamp() {
    var date = new Date();
    return date.toLocaleTimeString();
}