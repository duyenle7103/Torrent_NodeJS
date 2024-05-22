import request from "request";

export function sendInfoToClient(IP, port, data) {
    const url = 'http://' + IP + ':' + port + '/announce/receive';

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
        console.log("\tInfo: ", data);
        console.log("Error: ", error);
        return;
    });
}