import request from "request";

function sendInfoToClient(IP, port, data) {
    const url = 'http://' + IP + ':' + port + '/announce/tracker';

    var clientServerOptions = {
        uri: url,
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(clientServerOptions, function (error, response) {
        console.log("Sending information to client:");
        console.log("\tInterval: ", data.interval);
        console.log("\tPeer's address: ", data.peers);
        console.log("Error: ", error);
        return;
    });
}

export { sendInfoToClient }